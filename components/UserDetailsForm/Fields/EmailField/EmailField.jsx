import React, { useEffect } from "react";

//Context
import { useFormContext } from "@/context/FormContext";
import CancelButton from "../../Buttons/CancelButton/CancelButton";
import EditButton from "../../Buttons/EditButton/EditButton";
import SaveButton from "../../Buttons/SaveButton/SaveButton";
import { useFormState } from "react-dom";
import { updateUser } from "@/app/actions/updateUser";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NameField = ({ id, label, field, session }) => {
  const { isEditing } = useFormContext();

  const [state, formAction] = useFormState(updateUser, {
    message: "Initial state",
    errors: "",
  });

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
        // Refresh the page to close editing mode
        router.refresh();
        //Display notification to user
        toast.success("User updated successfully", {
          style: { marginTop: "50px" },
        });
      }
    }
    handleSessionUpdate();
  }, [session, state, update, router]);

  return (
    <>
      <form
        className={`user-details-form-item ${
          isEditing.password || (isEditing.email && id !== "name")
            ? "flex-center-column"
            : ""
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
          <div
            key="edit-password"
            className="user-details-form-item__edit-password"
          >
            <label
              className="user-details-form-item__edit-password__label"
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
              className="user-details-form-item__edit-password__label"
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
        <div
          key="buttons"
          className={
            isEditing.password || isEditing.email
              ? "flex-center-column"
              : "flex-center"
          }
        >
          {isEditing[id] === true ? (
            <CancelButton id={id} formAction={formAction} />
          ) : null}
          {isEditing[id] === true ? <SaveButton /> : <EditButton id={id} />}
        </div>
      </form>
      {state.errors.emailsMatching && <p>{state.errors.emailsMatching}</p>}
      {state.errors.email &&
        state.errors.email.map((err) => <p key={err.email}>{err}</p>)}
    </>
  );
};

export default NameField;
