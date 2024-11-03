import Image from "next/image";
import Link from "next/link";

//Components
import BackButton from "../../components/Buttons/BackButton/BackButton";
import SignoutButton from "../../components/Buttons/SignoutButton/SignoutButton";

//Icons
import { IoIosArrowForward } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

//Authentication
import { auth } from "@/auth";

//Styles
import "./user.scss";

export default async function ProfileClient() {
  const session = await auth();

  return (
    <div className="page user-page">
      <div className="user-page-bg"></div>
      <BackButton>Profile</BackButton>
      <div className="user-page__header">
        <Image
          className="user-page__header__image"
          src="/images/user-avatar.jpg"
          alt=""
          width={120}
          height={120}
        />

        <p className="user-page__header__name">
          {session?.user.name}
        </p>
        <p>{session?.user.email}</p>
      </div>
      <nav className="user-page__menu">
        <div className="user-page__menu__item">
          <Link href="/user/account">
            <FaUserAlt className="icon" />
            <h4>Account details</h4>
            <IoIosArrowForward
              className="icon"
              style={{ marginLeft: "auto" }}
            />
          </Link>
        </div>
        <div className="user-page__menu__item">
          <Link href="/user/wishlist">
            <FaHeart className="icon" />
            <h4>Wishlist</h4>
            <IoIosArrowForward
              className="icon"
              style={{ marginLeft: "auto" }}
            />
          </Link>
        </div>
        <div className="user-page__menu__item">
          <Link href="/user/orders">
            <FaList className="icon" />
            <h4>Orders</h4>
            <IoIosArrowForward
              className="icon"
              style={{ marginLeft: "auto" }}
            />
          </Link>
        </div>
        <SignoutButton />
      </nav>
    </div>
  );
}
