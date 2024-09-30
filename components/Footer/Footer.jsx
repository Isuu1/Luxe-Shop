import Image from "next/image";
import React from "react";

//Styles
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__inner-wrapper">
        <div className="footer__inner-wrapper__contact">
          <h2>Contact</h2>
          <p>Luxe Ltd.</p>
          <p>1 Kensington High Street </p>
          <p> London, W8 5NP </p>
          <p>United Kingdom</p>

          <p>
            <span className="bold">Phone: </span>+44 (0)20 7946 0958
          </p>
          <p>
            <span className="bold">Email:</span> info@luxeltd.co.uk
          </p>
        </div>
        <div className="footer__inner-wrapper__socials">
          <h2>Socials</h2>
          <div className="footer__inner-wrapper__socials__icons">
            <Image
              className="footer__inner-wrapper__socials__icons__icon"
              src="/images/instagram-icon.svg"
              fill
              alt=""
            />
            <Image
              className="footer__inner-wrapper__socials__icons__icon"
              src="/images/x-icon.svg"
              fill
              alt=""
            />
            <Image
              className="footer__inner-wrapper__socials__icons__icon"
              src="/images/facebook-icon.svg"
              fill
              alt=""
            />
            <Image
              className="footer__inner-wrapper__socials__icons__icon"
              src="/images/linkedin-icon.svg"
              fill
              alt=""
            />
          </div>
        </div>
      </div>
      <p className="footer__copyright">
        Copyright 2024. © All rights reserved
      </p>
    </div>
  );
};

export default Footer;
