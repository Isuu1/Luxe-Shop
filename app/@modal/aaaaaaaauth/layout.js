import LoginModalContainer from "@/components/LoginModalContainer/LoginModalContainer";
import { isMobileDevice } from "@/lib/utils";
import { headers } from "next/headers";

export default function RootLayout({ children }) {
  const mobile = isMobileDevice(headers());
  console.log("Is mobile?", mobile);

  return mobile ? (
    <div
      style={{
        zIndex: "99",
        background: "white",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      {children}
    </div>
  ) : (
    <LoginModalContainer>{children}</LoginModalContainer>
  );
}
