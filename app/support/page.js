//Components
import BackButton from "@/components/Buttons/BackButton/BackButton";
import FAQ from "@/components/FAQ/FAQ";
import SupportForm from "@/components/SupportForm/SupportForm";

//Styles
import "./support.scss";
import Image from "next/image";

export default function Page() {
  return (
    <div className="page support-page-container">
      <BackButton>Support</BackButton>
      <div className="support-page-container__headline">
        <h2>Support & FAQs</h2>
        <p>
          Find answers to common questions or contact us for further assistance.
        </p>
      </div>
      <section className="grid-2-columns">
        <FAQ />
        <Image
          className="support-page-container__image"
          src="/images/faq.png"
          alt="FAQ"
          fill
        />
      </section>
      <div className="support-page-container__headline">
        <h2>Contact Us</h2>
        <p>
          Feel free to reach out to us using the contact form below or via the
          details provided.
        </p>
      </div>
      <section className="grid-2-columns">
        <SupportForm />
        <div className="support-page-container__contact-details">
          <h3 className="support-page-container__contact-details__title">
            Contact Details
          </h3>
          <p>
            <strong>Email:</strong> support@luxe.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p>
            <strong>Address:</strong>
          </p>
          <p>
            123 Electronics Avenue
            <br />
            Tech City, TX 75001
          </p>
          <p>
            <strong>Support Hours:</strong>
          </p>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        </div>
      </section>
    </div>
  );
}
