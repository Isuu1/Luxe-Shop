"use client";

import React, { useState } from "react";

//Styles
import "./supportForm.scss";
import Image from "next/image";

const SupportForm = () => {
  const [formPending, setFormPending] = useState(false);

  const [formSuccess, setFormSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormPending(true);
    setTimeout(() => {
      setFormPending(false);
      setFormSuccess(true);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return formSuccess ? (
    <div className="support-page-contact-form__success">
      <Image
        className="signup-success__image"
        src="/images/success.png"
        alt="checked"
        width={90}
        height={90}
      />
      <p>
        Thank you! Your request has been submitted. Our team will get back to
        you within 24 hours.
      </p>
    </div>
  ) : (
    <form className="support-page-contact-form" onSubmit={handleSubmit}>
      <div className="support-page-contact-form__title">Contact form</div>
      <label className="support-page-contact-form__label" htmlFor="name">
        Name:
      </label>
      <input
        className="support-page-contact-form__input"
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        disabled={formPending}
        aria-disabled={formPending}
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label className="support-page-contact-form__label" htmlFor="email">
        Email:
      </label>
      <input
        className="support-page-contact-form__input"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        disabled={formPending}
        aria-disabled={formPending}
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label className="support-page-contact-form__label" htmlFor="message">
        Message:
      </label>
      <textarea
        className="support-page-contact-form__textarea"
        id="message"
        name="message"
        placeholder="Message"
        disabled={formPending}
        aria-disabled={formPending}
        value={formData.message}
        onChange={handleChange}
        rows="5"
        required
      ></textarea>

      <button
        className="support-page-contact-form__button"
        type="submit"
        disabled={formPending}
        aria-disabled={formPending}
      >
        {formPending ? "Submitting" : "Send Message"}
      </button>
    </form>
  );
};

export default SupportForm;
