"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const EmblaCarouselContainer = ({ children }) => {
  const [emblaRef] = useEmblaCarousel(
    { dragFree: true, loop: false },
    [Autoplay({ playOnInit: true, delay: 3000 })]
  );

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">{children}</div>
    </div>
  );
};

export default EmblaCarouselContainer;
