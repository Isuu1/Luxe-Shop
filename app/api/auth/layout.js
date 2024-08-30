import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <div className="page">
      {/* <h1>This is paraller route</h1>
      <Image
        className="login-container__image"
        src="/images/login-img.png"
        alt=""
        width={300}
        height={300}
      /> */}
      {children}
    </div>
  );
}
