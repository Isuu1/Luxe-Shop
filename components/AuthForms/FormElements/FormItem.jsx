import React from "react";

//Icons
import { FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

const FormItem = ({
  placeholder,
  type,
  name,
  id,
  required,
  label,
  formPending,
}) => {
  const generateIcon = (type) => {
    switch (type) {
      case "email":
        return <FaUser className="auth-form__item__icon" />;
      case "password":
        return <FaUnlock className="auth-form__item__icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="auth-form__item">
      <label className="auth-form__item__hidden" htmlFor="email">
        {label}
      </label>
      {generateIcon(type)}
      <input
        className="auth-form__item__input"
        placeholder={placeholder}
        name={name}
        id={id}
        type={type}
        required={required}
        {...(formPending && { disabled: true })}
      />
    </div>
  );
};

export default FormItem;
