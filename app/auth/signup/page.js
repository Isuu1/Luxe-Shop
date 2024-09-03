import { signup } from "@/lib/actions/auth";

import bcrypt from "bcrypt";

export default function signUp() {
  const hashedPassword = bcrypt.hashSync(
    "Testing",
    bcrypt.genSaltSync(10)
  );
  console.log("Hashed pass: ", hashedPassword);

  return (
    <>
      <h2 className="headline">Register</h2>
      <form className="login-form" action={signup}>
        <label className="login-form__item">
          {/* <FaUser className="login-form__item__icon" /> */}
          <input
            className="login-form__item__input"
            placeholder="Email"
            type="email"
            name="email"
            id="email"
          />
        </label>
        <label className="login-form__item">
          {/* <FaUnlock className="login-form__item__icon" /> */}
          <input
            className="login-form__item__input"
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />
        </label>
        {/* {state.message === "error" && <h1>User not found</h1>} */}

        <button className="login-form__submit-button" type="submit">
          Submit
          {/* <IoSend className="login-form__submit-button__icon" /> */}
        </button>
      </form>

      <p className="login-form__signup">
        Dont have an account? <strong>Sign in</strong>
      </p>
    </>
  );
}
