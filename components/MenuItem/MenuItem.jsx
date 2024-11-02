"use client";

import React from "react";

//Animations
import { motion } from "framer-motion";
import { menuItemVariants } from "@/styles/animations";

const MenuItem = ({ children }) => {
  return (
    <motion.li
      className="menu-container__item"
      variants={menuItemVariants}
    >
      {children}
    </motion.li>
  );
};

export default MenuItem;
