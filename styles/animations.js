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

export const menuSlide = {
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

export const searchListAppear = {
  visible: {
    minHeight: "100px",
    paddingTop: "60px",
    transition: { duration: 0.2 },
  },
  hidden: {
    minHeight: 0,
    paddingTop: 0,
  },
  exit: {
    height: "0",
    minHeight: "0",
    paddingTop: 0,
    transition: { duration: 0.2 },
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
