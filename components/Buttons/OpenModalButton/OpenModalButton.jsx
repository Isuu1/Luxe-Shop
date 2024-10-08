import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import React from "react";
import "./openModalButton.scss";

const OpenModalButton = ({ user }) => {
  const { userModal, setUserModal } = useStateContext();

  const handleModal = (e) => {
    e.stopPropagation();
    setUserModal(!userModal);
  };

  return (
    <button className="open-modal" onClick={handleModal}>
      <Image
        className="open-modal__image"
        src={`${user ? user.userImage : "/images/user2.png"}`}
        alt=""
        fill
      />
    </button>
  );
};

export default OpenModalButton;
