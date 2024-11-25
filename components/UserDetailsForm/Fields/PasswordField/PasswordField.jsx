import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

//Context
import { useFormContext } from "@/context/FormContext";

//Components
import CancelButton from "../../Buttons/CancelButton/CancelButton";
import EditButton from "../../Buttons/EditButton/EditButton";
import SaveButton from "../../Buttons/SaveButton/SaveButton";

//Form hooks
import { useFormState } from "react-dom";

//Authentication
import { updateUser } from "@/lib/actions/updateUser";
import { useSession } from "next-auth/react";

const NameField = ({ id, label, field, session }) => {
  const { isEditing, setIsEditing } = useFormContext();

  const [state, formAction] = useFormState(updateUser, {
    message: "Initial state",
    errors: "",
  });

  //Control password visibility
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { update } = useSession();

  useEffect(() => {
    async function handleSessionUpdate() {
      if (state.success) {
        console.log("State in form: ", state);
        await update({
          ...session,
          user: {
            ...session.user,
            name: state.data.name,
            email: state.data.email,
          },
        });
        //Refresh the page to display updated data
        router.refresh();
        //Set isEditing to false to close editing mode
        setIsEditing((prevState) => ({ ...prevState, [id]: false }));
        //Display notification to user
        toast.success("Password updated successfully", {
          style: { marginTop: "50px" },
        });
      }
    }
    handleSessionUpdate();
  }, [session, state, update, router, id, setIsEditing]);

  const handlePasswordReveal = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form
        className={`user-details-form-item ${
          isEditing.password ? "flex-center-column" : ""
        }`}
        action={formAction}
      >
        <label className="user-details-form-item__label" htmlFor="name">
          {isEditing[id] ? "Edit password" : label}
        </label>
        {!isEditing[id] ? (
          <p className="user-details-form-item__field" key="field">
            {field}
          </p>
        ) : null}
        {isEditing.password && (
          <div key="edit-password" className="user-details-form-item__extended">
            <label
              className="user-details-form-item__extended__label"
              htmlFor="password"
            >
              New password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="user-details-form-item__input"
                type={showPassword ? "text" : "password"}
                id={id}
                key={id}
                name={id}
                required
              />
              <button
                className="user-details-form-item__extended__reveal-password-button"
                onClick={handlePasswordReveal}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label
              className="user-details-form-item__extended__label"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <input
              className="user-details-form-item__input"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
            />
          </div>
        )}
        <div key="buttons" className="flex-center">
          {isEditing[id] === true ? (
            <CancelButton id={id} formAction={formAction} />
          ) : null}
          {isEditing[id] === true ? <SaveButton /> : <EditButton id={id} />}
        </div>
      </form>
      {state.errors.passwordsMatching && (
        <p className="error">{state.errors.passwordsMatching}</p>
      )}
      {state.errors.password &&
        state.errors.password.map((err) => (
          <p key={err.password} className="error">
            {err}
          </p>
        ))}
    </>
  );
};

export default NameField;
