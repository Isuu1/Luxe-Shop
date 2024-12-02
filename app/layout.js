import React from "react";
import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

//Context
import { StateContext } from "../context/StateContext";
import { CartContext } from "../context/CartContext";

//Components
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer/Footer";

//Lib
import { Providers } from "./providers";
import { auth } from "@/auth";

//Fonts
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Luxe Shop",
  description: "Welcome to Luxe Shop",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  console.log("Session", session);

  return (
    <html lang="en" className={rubik.className}>
      <body suppressHydrationWarning={true}>
        <Providers>
          <SpeedInsights />
          <StateContext>
            <CartContext>
              <Toaster
                toastOptions={{
                  className: "",
                  style: {
                    padding: "16px",
                    color: "#000",
                    fontSize: "1rem",
                  },
                }}
              />
              <Navbar user={session?.user} />
              {children}
              <Footer />
            </CartContext>
          </StateContext>
        </Providers>
      </body>
    </html>
  );
}
