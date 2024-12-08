import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
import { handleSessionUpdate } from "@/lib/utils";

const NameField = ({ id, label, field, session }) => {
  const { isEditing, setIsEditing } = useFormContext();

  const [state, formAction] = useFormState(updateUser, {
    message: "Initial state",
    errors: "",
  });

  const { update } = useSession();

  useEffect(() => {
    handleSessionUpdate(state, update, session);
    if (state.success) {
      toast.success("Email updated successfully", {
        style: { marginTop: "50px" },
      });
    }
  }, [state, update, session]);

  useEffect(() => {
    if (state.success) {
      setIsEditing((prevState) => ({ ...prevState, [id]: false }));
    }
  }, [state.success, setIsEditing, id]);

  return (
    <>
      <form
        className={`user-details-form-item ${
          isEditing.email ? "flex-center-column" : ""
        }`}
        action={formAction}
      >
        <label className="user-details-form-item__label" htmlFor="name">
          {isEditing[id] ? "Edit email" : label}
        </label>
        {!isEditing[id] ? (
          <p className="user-details-form-item__field" key="field">
            {field}
          </p>
        ) : null}
        {isEditing.email && id === "email" && (
          <div key="edit-password" className="user-details-form-item__extended">
            <label
              className="user-details-form-item__extended__label"
              htmlFor="password"
            >
              New email
            </label>
            <input
              className="user-details-form-item__input"
              type="email"
              id={id}
              key={id}
              name={id}
              required
            />
            <label
              className="user-details-form-item__extended__label"
              htmlFor="confirm"
            >
              Confirm email
            </label>
            <input
              className="user-details-form-item__input"
              type="email"
              id="confirmEmail"
              key="confirmEmail"
              name="confirmEmail"
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
      {state.errors.emailsMatching && (
        <p className="error">{state.errors.emailsMatching}</p>
      )}
      {state.errors.email &&
        state.errors.email.map((err) => (
          <p key={err.email} className="error">
            {err}
          </p>
        ))}
    </>
  );
};

export default NameField;
