import React, { useEffect, useState } from "react";

//Styles
import "./userDetailsFormItem.scss";

//Animations
import { AnimatePresence, delay, motion } from "framer-motion";
import { exit } from "process";

const UserDetailsFormItem = ({ label, field, id }) => {
  const [isEdititng, setIsEditing] = useState(false);
  const [passwordToggled, setPasswordToggled] = useState(false);

  // console.log("label: ", label);
  // console.log("field: ", field);
  // console.log("key: ", id);

  // useEffect(() => {
  //   if (isEdititng !== null) {
  //     const container = document.getElementById("input");
  //     container.focus();
  //   }
  // }, [isEdititng]);

  console.log("isEditing: ", isEdititng);
  console.log("id: ", id);

  const handleEdit = (e, id) => {
    console.log("Editing fired: ");
    e.preventDefault();
    // if (isEdititng !== null) {
    //   console.log("aaaa");
    //   return;
    // }
    if (id !== "password") {
      setIsEditing(true);
    } else {
      setPasswordToggled(true);
    }
    // if (isEdititng !== null) {
    //   setIsEditing(null);
    // }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log(e.target);
    setIsEditing(false);
    setPasswordToggled(false);
  };

  const inputVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.2 } },
  };

  const cancelButtonVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, delay: 1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div
      className={`user-details-form-item ${
        passwordToggled && "flex-center-column"
      }`}
    >
      <label className="user-details-form-item__label" htmlFor="name">
        {passwordToggled ? "Edit password" : label}
      </label>
      <AnimatePresence>
        {!passwordToggled &&
          (!isEdititng ? (
            <motion.p
              className="user-details-form-item__field"
              key="field"
              // variants={fieldVariants}
              // initial="hidden"
              // animate="visible"
              // exit="exit"
            >
              {field}
            </motion.p>
          ) : (
            <motion.input
              className="user-details-form-item__input"
              id="input"
              key="input"
              // variants={inputVariants}
              // initial="hidden"
              // animate="visible"
              // exit="exit"
              // key="input"
            />
          ))}

        {passwordToggled && (
          <div
            key="edit-password"
            className="user-details-form-item__edit-password"
          >
            <label
              className="user-details-form-item__edit-password__label"
              htmlFor="password"
            >
              New password
            </label>
            <input className="user-details-form-item__input" />
            <label
              className="user-details-form-item__edit-password__label"
              htmlFor="confirm"
            >
              Confirm password
            </label>
            <input className="user-details-form-item__input" />
          </div>
        )}
        {/* {isEdititng && id !== "password" ? (
          <motion.input
            className="user-details-form-item__input"
            id="input"
            // variants={inputVariants}
            // initial="hidden"
            // animate="visible"
            // exit="exit"
            // key="input"
          />
        ) : null} */}
        {/* {isEdititng && id === "password" && (
          <div className="user-details-form-item__label__edit-password">
            <label htmlFor="password">New password</label>
            <input />
            <label htmlFor="confirm">Confirm password</label>
            <input />
          </div>
        )} */}

        <div
          key="buttons"
          className={
            passwordToggled ? "flex-center-column" : "flex-center"
          }
        >
          {isEdititng || passwordToggled ? (
            <motion.button
              className="user-details-form-item__cancel-button"
              onClick={handleCancel}
              key="cancel"
              // variants={cancelButtonVariants}
              // initial="hidden"
              // animate="visible"
              // exit="exit"
            >
              Cancel
            </motion.button>
          ) : null}
          <button
            className="user-details-form-item__edit-button"
            onClick={(e) => handleEdit(e, id)}
            key="edit"
          >
            {isEdititng || passwordToggled ? "Save" : "Edit"}
          </button>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default UserDetailsFormItem;
