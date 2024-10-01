import React from "react";
import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

//Context
import { StateContext } from "../context/StateContext";
import { CartContext } from "../context/CartContext";

//Components
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

//Lib
import { Providers } from "./providers";
import Footer from "@/components/Footer/Footer";
import { auth } from "@/auth";

export const metadata = {
  title: "Luxe Shop",
  description: "Welcome to Luxe Shop",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
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
