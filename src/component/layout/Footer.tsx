import "../../styles/Footer.scss";
import Payment from "../payment/Payment";

function Footer() {
  const footer = "yes";
  return (
    <div className="footerContainer">
      <div className="pDiv">
        <p>PAYMENT OPTIONS</p>
      </div>

      <div className="footerDivPayment">
        <Payment footer={footer} />
      </div>
      <div className="footerDivTrademark">
        <p> Sun games is a trademark of Solar Operations Limited.</p>
        <p>
          Solar Operations Limited copyright 2022 - All rights reserved.
          Important NOTE: This is a gambling offer. Gambling is not a solution
          to financial problems. Please read the terms and conditions and gamble
          responsibly!
        </p>
        <div className="footerSvgs">
          <img src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/en/trust-icn_ssl.svg"></img>
          <img src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/en/trust-icn_germany.svg"></img>
          <img src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/en/trust-icn_top-games.svg"></img>
        </div>
      </div>
    </div>
  );
}

export default Footer;
