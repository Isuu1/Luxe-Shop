import React from "react";
import "../styles/globals.css";

//Context
import { StateContext } from "../context/StateContext";
import { CartContext } from "../context/CartContext";

//Components
import Navbar from "../components/Navbar/Navbar";
import ShoppingCartIcon from "../components/ShoppingCartIcon/ShoppingCartIcon";
import DesktopLayout from "../components/DesktopLayout/DesktopLayout";
import { Toaster } from "react-hot-toast";

//Lib
import { Providers } from "./providers";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { isMobileDevice } from "@/lib/utils";
import Footer from "@/components/Footer/Footer";
import { auth } from "@/auth";

export const metadata = {
  title: "Luxe Shop",
  description: "Welcome to Luxe Shop",
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);
  const session = await auth();

  console.log("Session :", session);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <StateContext>
            <CartContext>
              <Toaster />
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
