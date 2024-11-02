"use client";

import React from "react";

//Styles
import "./menuItem.scss";

//Animations
import { motion } from "framer-motion";
import { menuItemVariants } from "@/styles/animations";

const MenuItem = ({ children }) => {
  return (
    <motion.li className="menu-item" variants={menuItemVariants}>
      {children}
    </motion.li>
  );
};

export default MenuItem;
