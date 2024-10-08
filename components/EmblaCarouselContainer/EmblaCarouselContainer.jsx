"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

//Styles
import "./emblaCarouselContainer.scss";

const EmblaCarouselContainer = ({ children }) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    loop: false,
  });

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">{children}</div>
    </div>
  );
};

export default EmblaCarouselContainer;
