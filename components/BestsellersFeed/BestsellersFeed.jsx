"use client";
import React from "react";

import useEmblaCarousel from "embla-carousel-react";

const Bestsellers = ({ children }) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="home-container__bestsellers">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container home-container__bestsellers__item">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
