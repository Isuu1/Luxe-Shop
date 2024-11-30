import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await auth();

  if (session !== null) {
    redirect("/");
  }

  return <div className="page">{children}</div>;
}
