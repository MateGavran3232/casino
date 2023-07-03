import { render, screen } from "@testing-library/react";
import Carousel from "../component/utils/Carousel";
import { describe, test, expect } from "vitest";
describe("Carousel Component", () => {
  const testData = {
    images: ["image1.jpg", "image2.jpg", "image3.jpg"],
  };

  test("renders carousel with correct number of images", () => {
    render(<Carousel images={testData.images} />);
    const carouselImages = screen.getAllByRole("img");
    expect(carouselImages).toHaveLength(testData.images.length);
  });
});
