import React, { useState, useEffect, useRef } from "react";
import { CrousoleImg as images } from "../../assets/banner";

export default function Banner() {
  return (
    <>
      {/* Discount banner at the top */}
      <div className="bg-red-500 text-white text-center p-6 text-2xl font-bold">
        Mega Sale! Up to 50% Off on Top Brands
      </div>
      <HeroCarousel />
    </>
  );
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0); // Current slide index
  const timeoutRef = useRef(null); // Store timeout reference

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear existing timeout
    }
  };

  useEffect(() => {
    resetTimeout(); // Clear previous timeout
    timeoutRef.current = setTimeout(
      () => setCurrent((prevIndex) => (prevIndex + 1) % images.length), // Move to next slide
      4000 // Auto-slide every 4 seconds
    );

    return () => resetTimeout(); // Cleanup on unmount
  }, [current]); // Run effect on current slide change

  const goToSlide = (index) => {
    setCurrent(index); // Set slide manually on button click
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Map through images and display slides */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          } shadow-2xl`}
        >
          {/* Slide Image */}
          <img
            src={src}
            alt={`Carousel image ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all  ${
                index === current
                  ? "bg-white w-4 border-2 border-black" // Active dot
                  : "bg-gray-700" // Inactive dot
              }`}
              onClick={() => goToSlide(index)} // Change slide on click
              aria-label={`Go to slide ${index + 1}`} // Accessibility
            />
          ))}
        </div>
      </div>
    </div>
  );
}
