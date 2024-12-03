//Styles
import Link from "next/link";
import "../authStyles.scss";
import Image from "next/image";

export default function VerifyEmail() {
  return (
    <div className="auth-form-container">
      <h1 className="auth-form-container__logo">luxe.</h1>
      <Image
        src="/images/success.png"
        alt="checked"
        width={90}
        height={90}
      ></Image>
      <p className="auth-form-container__headline">
        Account successfuly verified
      </p>
      <p className="auth-form-container__headline">
        You can now log in to your account
      </p>
      <div className="auth-form-container__verification-buttons">
        <Link href="/">
          <button>Return home</button>
        </Link>
        <Link href="/auth/signin">
          <button className="auth-form-container__verification-buttons__purple">
            Go to login
          </button>
        </Link>
      </div>
    </div>
  );
}
