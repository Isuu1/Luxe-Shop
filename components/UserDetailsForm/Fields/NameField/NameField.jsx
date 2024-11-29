import React, { useEffect } from "react";
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

//Styles
import "../userDetailsFormItem.scss";
import { handleSessionUpdate } from "@/lib/utils";

const NameField = ({ id, label, field, session }) => {
  const { isEditing, setIsEditing } = useFormContext();

  const [state, formAction] = useFormState(updateUser, {
    message: "Initial state",
    errors: "",
  });

  // console.log("State in NameField: ", state);

  console.log("Is editing in name field: ", isEditing);

  console.log("Session in name field: ", session);

  const { update } = useSession();

  useEffect(() => {
    handleSessionUpdate(state, update, session);
    if (state.success) {
      toast.success("Name updated successfully", {
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
      <form className="user-details-form-item" action={formAction}>
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
            name={id}
            required
          />
        )}
        <div key="buttons" className="flex-center">
          {isEditing[id] === true ? (
            <CancelButton id={id} formAction={formAction} />
          ) : null}
          {isEditing[id] === true ? <SaveButton /> : <EditButton id={id} />}
        </div>
      </form>
      {state.errors.name &&
        state.errors.name.map((err) => (
          <p key={err.name} className="error">
            {err}
          </p>
        ))}
    </>
  );
};

export default NameField;
