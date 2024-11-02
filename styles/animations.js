import { delay, stagger } from "framer-motion";

export const cartSlide = {
  visible: {
    x: "0",
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    x: "100%",
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    x: "100%",
  },
};

export const menuContainerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
      //Delay exit animation to let all children exit first
      delay: 0.2,
    },
  },
};

export const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: 200,
    scale: 0,
    transition: { duration: 0.15, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.15, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: 200,
    scale: 0,
    transition: { duration: 0.15, ease: "easeInOut" },
  },
};

export const cartProductAnimation = {
  visible: {
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const productAnimation = {
  visible: {
    scale: 1,
    // opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    scale: 0,
    // opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    scale: 0,
    // opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const searchFieldAppear = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const searchBlur = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const searchListAppear = {
  visible: {
    maxHeight: "1000px",
    transition: { duration: 0.4 },
  },
  hidden: {
    maxHeight: 0,
  },
  exit: {
    maxHeight: "0",
    // minHeight: "0",
    transition: { duration: 0.4 },
  },
};

export const userModalAnimation = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hidden: {
    opacity: 0,
    scale: 0,
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const loginModalAnimation = {
  visible: {
    opacity: 1,
    scale: 1,
    // Keep modal centered
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hidden: {
    opacity: 0,
    scale: 0,
    // Keep modal centered
    x: "-50%",
    y: "-50%",
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const loginModalBackgroundAnimation = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const mobileSearchBarAnimation = {
  hidden: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
  exit: {
    y: -100,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
};

export const opacityAnimation = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
