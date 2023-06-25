import "../styles/Carousel.scss";
import { useState, useEffect, useRef, useCallback } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
  }, [images.length]);

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startInterval]);

  const showSlide = (index: number) => {
    setCurrentSlide(index);
    startInterval();
  };

  const renderSlides = () => {
    return images.map((image: string, index: number) => (
      <img
        key={index}
        src={image}
        alt={`Image ${index + 1}`}
        className={`slide ${index === currentSlide ? "active" : ""}`}
      />
    ));
  };

  const renderDots = () => {
    return images.map((_: string, index: number) => (
      <span
        key={index}
        className={`dot ${index === currentSlide ? "active" : ""}`}
        onClick={() => showSlide(index)}
      />
    ));
  };

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {renderSlides()}
      </div>
      <div className="dots-container">{renderDots()}</div>
    </div>
  );
};

export default Carousel;
