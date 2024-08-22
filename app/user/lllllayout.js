import BackButton from "@/components/BackButton/BackButton";
import Image from "next/image";

//Icons
import { IoIosArrowForward } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import SignoutButton from "@/components/SignoutButton/SignoutButton";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function UserPageLayout({ children }) {
  const session = await getServerSession(options);

  return (
    // <div className="page">
    //   <BackButton>Profile</BackButton>
    //   <div className="user-page">
    //     <div className="user-page__header">
    //       <div style={{ position: "relative" }}>
    //         <Image
    //           className="user-page__header__image"
    //           src="/images/user-avatar.jpg"
    //           alt=""
    //           width={120}
    //           height={120}
    //         />
    //         <button className="user-page__header__edit-button">
    //           <MdEditDocument style={{ color: "white" }} />
    //         </button>
    //       </div>

    //       <p className="user-page__header__name">
    //         {session.user.name}
    //       </p>
    //       <p>Member since 2023</p>

    //       {/* <SignoutButton /> */}
    //     </div>
    //     <ul className="user-page__menu">
    //       <li className="user-page__menu__item">
    //         <Link href="/">
    //           <FaUserAlt className="icon" />
    //           <h4>Account details</h4>
    //           <IoIosArrowForward
    //             className="icon"
    //             style={{ marginLeft: "auto" }}
    //           />
    //         </Link>
    //       </li>
    //       <li className="user-page__menu__item">
    //         <Link href="/user/wishlist">
    //           <FaHeart className="icon" />
    //           <h4>Wishlist</h4>
    //           <IoIosArrowForward
    //             className="icon"
    //             style={{ marginLeft: "auto" }}
    //           />
    //         </Link>
    //       </li>
    //       <li className="user-page__menu__item">
    //         <Link href="/user/orders">
    //           <FaList className="icon" />
    //           <h4>Orders</h4>
    //           <IoIosArrowForward
    //             className="icon"
    //             style={{ marginLeft: "auto" }}
    //           />
    //         </Link>
    //       </li>
    //     </ul>

    //     {children}
    //   </div>
    // </div>
    <div>
      <h1>Zostawilem to i chuj ci na pysk</h1>
      {children}
    </div>
  );
}
