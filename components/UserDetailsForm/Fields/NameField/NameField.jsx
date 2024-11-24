import React, { useEffect, useRef } from "react";

//Context
import { useFormContext } from "@/context/FormContext";
import CancelButton from "../../Buttons/CancelButton/CancelButton";
import EditButton from "../../Buttons/EditButton/EditButton";
import SaveButton from "../../Buttons/SaveButton/SaveButton";
import { useFormState } from "react-dom";
import { updateUser } from "@/app/actions/updateUser";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

//Styles
import "../userDetailsFormItem.scss";

const NameField = ({ id, label, field, session }) => {
  const { isEditing, handleInputChange } = useFormContext();

  const [state, formAction] = useFormState(updateUser, {
    message: "Initial state",
    errors: "",
    isEditing: false,
    resetKey: Date.now().toString(),
  });

  const router = useRouter();
  const { update } = useSession();
  const formRef = useRef();

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
      }
    }
    handleSessionUpdate();
  }, [session, state, update, router]);

  console.log("Is editing:", isEditing[id]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
      console.log("Form reset");
    }
  }, [state.errors]);

  console.log("State in name field: ", state);

  return (
    <>
      <form
        className={`user-details-form-item ${
          isEditing.password || (isEditing.email && id !== "name")
            ? "flex-center-column"
            : ""
        }`}
        action={formAction}
        ref={formRef}
      >
        <button onClick={() => formRef.current.reset()}>Reset form test</button>
        <label className="user-details-form-item__label" htmlFor="name">
          {label}
        </label>
        {!isEditing[id] ? (
          <p className="user-details-form-item__field" key="field">
            {field}
          </p>
        ) : null}
        {isEditing.name && id === "name" && (
          <input
            className="user-details-form-item__input"
            id={id}
            key={id}
            onChange={handleInputChange}
            // value={inputValue}
            name={id}
          />
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
            <CancelButton
              id={id}
              field={field}
              state={state}
              formRef={formRef}
            />
          ) : null}
          {isEditing[id] === true ? <SaveButton /> : <EditButton id={id} />}
        </div>
      </form>
      {state.errors.name &&
        state.errors.name.map((err) => <p key={err.name}>{err}</p>)}
    </>
  );
};

export default NameField;
