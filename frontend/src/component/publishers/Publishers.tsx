import "../../styles/Publishers.scss";
import InfiniteLooper from "../utils/InfiniteLooper";

function Publishers() {
  return (
    <div className="publisherContainer">
      <div className="titleDiv">
        <h2>Our providers</h2>
      </div>
      <div className="publisherDiv">
        <InfiniteLooper speed={20} direction="left" publisher={true}>
          <div className="publisherImgDiv firstImg">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/en/1_merkur.png"
              alt=""
            />
          </div>
          <div className="publisherImgDiv">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/en/2_greentube.png"
              alt=""
            />
          </div>
          <div className="publisherImgDiv">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/en/3_amatic.png"
              alt=""
            />
          </div>
          <div className="publisherImgDiv">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/logo_gamomat_farbig.png"
              alt=""
            />
          </div>
          <div className="publisherImgDiv">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/logo_pragmatic-play_grau.png"
              alt=""
            />
          </div>
          <div className="publisherImgDiv">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/logo_oryx-gaming_grau.png"
              alt=""
            />
          </div>
          <div className="publisherImgDiv">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/7_p&s-grey.jpg"
              alt=""
            />
          </div>
          <div className="publisherImgDiv">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/8_relax-grey.jpg"
              alt=""
            />
          </div>
          <div className="publisherImgDiv lastImg">
            <img
              loading="lazy"
              src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/9_kalamba-grey.jpg"
              alt=""
            />
          </div>
        </InfiniteLooper>
      </div>
    </div>
  );
}

export default Publishers;
