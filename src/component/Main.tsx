import Carousel from "./Carousel";
import Games from "./Games";
import Payment from "./Payment";
const images = [
  "https://images.unsplash.com/photo-1595356700395-6f14b5c1f33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1591019052241-e4d95a5dc3fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
];
function Main() {
  return (
    <>
      <Carousel images={images} />
      <Payment />
      <Games />
    </>
  );
}

export default Main;
