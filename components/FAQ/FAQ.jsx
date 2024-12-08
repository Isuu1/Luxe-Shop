"use client";

import React, { useRef, useState } from "react";

//Styles
import "./faq.scss";

//Icons
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const FAQ = () => {
  const faq = [
    {
      id: 1,
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the My Orders section.",
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be in original condition and packaging.",
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to many countries worldwide. Shipping fees and delivery times vary by location.",
    },
    {
      id: 4,
      question: "How do I reset my password?",
      answer:
        "Click on Forgot Password on the login page and follow the instructions sent to your email.",
    },
    {
      id: 5,
      question: "How can I contact customer support?",
      answer:
        "You can use the contact form below or reach us via the provided contact details.",
    },
  ];

  const [answerId, setAnswerId] = useState(null);

  const handleAnswerVisibility = (itemId) => {
    setAnswerId(answerId === itemId ? null : itemId);
  };

  return (
    <section className="faq-container">
      <h2 className="faq-container__headline">Frequently Asked Questions</h2>
      {faq.map((item) => (
        <div
          key={item.id}
          className="faq-container__item"
          onClick={() => handleAnswerVisibility(item.id)}
        >
          <div className="flex-center-space-between">
            <p className="faq-container__item__question">{item.question}</p>
            {answerId === item.id ? (
              <FaMinus className="faq-container__item__question__icon" />
            ) : (
              <FaPlus className="faq-container__item__question__icon" />
            )}
          </div>
          {answerId === item.id && (
            <p className="faq-container__item__answer">{item.answer}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQ;
