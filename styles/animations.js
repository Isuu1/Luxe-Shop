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
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const searchListAppear = {
  visible: {
    minHeight: "100px",
    paddingTop: "60px",
    transition: { duration: 0.3 },
  },
  hidden: {
    minHeight: 0,
    paddingTop: 0,
  },
  exit: {
    height: "0",
    minHeight: "0",
    paddingTop: 0,
    transition: { duration: 0.3 },
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
