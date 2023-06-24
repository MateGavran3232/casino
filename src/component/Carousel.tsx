import "../styles/Carousel.css";
import { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const showSlide = (index: number) => {
    setCurrentSlide(index);
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
