"use client";
import React from "react";

import useEmblaCarousel from "embla-carousel-react";

const EmblaCarouselContainer = ({ children }) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">{children}</div>
    </div>
  );
};

export default EmblaCarouselContainer;
