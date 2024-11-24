import React, { useEffect } from "react";

//Context
import { useFormContext } from "@/context/FormContext";
import CancelButton from "../../Buttons/CancelButton/CancelButton";
import EditButton from "../../Buttons/EditButton/EditButton";
import SaveButton from "../../Buttons/SaveButton/SaveButton";
import { useFormState } from "react-dom";
import { updateUser } from "@/app/actions/updateUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        toast.success("Password updated successfully", {
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
            <input
              className="user-details-form-item__input"
              type="password"
              id={id}
              key={id}
              name={id}
              required
            />
            <label
              className="user-details-form-item__extended__label"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <input
              className="user-details-form-item__input"
              name="confirmPassword"
              type="password"
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
        <p>{state.errors.passwordsMatching}</p>
      )}
      {state.errors.password &&
        state.errors.password.map((err) => <p key={err.password}>{err}</p>)}
    </>
  );
};

export default NameField;
