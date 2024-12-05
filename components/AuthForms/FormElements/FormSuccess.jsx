import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const FormSuccess = ({ state }) => {
  const getMailboxUrl = () => {
    if (state.success) {
      const userEmail = state.user.email;
      const domain = userEmail.split("@")[1].toLowerCase();
      const mailboxUrls = {
        "gmail.com": "https://mail.google.com",
        "outlook.com": "https://outlook.live.com",
        "hotmail.com": "https://outlook.live.com",
        "yahoo.com": "https://mail.yahoo.com",
      };
      console.log("Mailbox URL: ", mailboxUrls[domain]);
      return mailboxUrls[domain] || "#";
    }
  };

  const router = useRouter();

  const handleRedirectToMailbox = () => {
    const mailboxUrl = getMailboxUrl();
    if (mailboxUrl) {
      router.push(mailboxUrl);
    }
  };

  return (
    <div className="signup-success">
      <Image
        className="signup-success__image"
        src="/images/success.png"
        alt="checked"
        width={90}
        height={90}
      ></Image>
      <p>Your account has been created.</p>
      <p>Check your email to verify your account.</p>
      <div className="signup-success__buttons">
        <button>Resend email</button>

        <button
          onClick={handleRedirectToMailbox}
          className="signup-success__buttons--purple"
        >
          Go to mailbox
        </button>
      </div>
    </div>
  );
};

export default FormSuccess;
