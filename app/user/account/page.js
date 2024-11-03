//Authentication
import { auth } from "@/auth";

//Components
import UserDetailsForm from "@/components/UserDetailsForm/UserDetailsForm";
import BackButton from "@/components/Buttons/BackButton/BackButton";

export default async function Page() {
  const session = await auth();

  console.log(session);

  return (
    <div className="page">
      <BackButton>Account details</BackButton>
      <UserDetailsForm session={session} />
    </div>
  );
}
