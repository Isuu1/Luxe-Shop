import { auth } from "@/auth";
import { redirect } from "next/navigation";

//Context
import { AuthFormContext } from "@/context/AuthFormContext";

export default async function RootLayout({ children }) {
  const session = await auth();

  if (session !== null) {
    redirect("/");
  }

  return (
    <AuthFormContext>
      <div className="page">{children}</div>
    </AuthFormContext>
  );
}
