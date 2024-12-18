//Authentication
import { auth } from "@/auth";
import { FormContext } from "@/context/FormContext";

//Components
import UserDetailsForm from "@/components/UserDetailsForm/UserDetailsForm";
import BackButton from "@/components/Buttons/BackButton/BackButton";

export default async function Page() {
  return (
    <div className="page">
      <FormContext>
        <BackButton>Account details</BackButton>
        <UserDetailsForm />
      </FormContext>
    </div>
  );
}
