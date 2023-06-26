import Carousel from "./Carousel";
import Games from "./Games";
import Payment from "./Payment";
import "../styles/Main.scss";
const images = [
  "https://www.novomatic.com/sites/default/files/styles/teaser/public/2021-05/77XzYsIjwxfZ0Kv.jpg?itok=BitsQd-p",
  "https://www.novomatic.com/sites/default/files/styles/teaser/public/2021-05/KdSwD5Ps5tkC5u8.jpg?itok=CQopEAC_",
  "https://www.novomatic.com/sites/default/files/styles/teaser/public/2022-11/c7UvatX9i7QB7dd.jpg?itok=L6vm4AM_",
];

function Main() {
  return (
    <>
      <div className="mainContainer">
        <Carousel images={images} />
        <Payment />
        <Games publisher="Gamomat" />
        <Games publisher="Merkur" />
        <Games publisher="Popular" />
      </div>
    </>
  );
}

export default Main;
