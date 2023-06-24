import "../styles/Payment.css";
function Payment() {
  return (
    <div className="payContainer">
      <div className="payDiv">
        <img
          loading="lazy"
          alt="payloado"
          src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/en/pay_paylado-short-white.svg"
        ></img>
        <img
          loading="lazy"
          alt="paypal"
          src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/pay_paypal_white.svg"
        ></img>
        <img
          loading="lazy"
          alt="sofort"
          src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/03_pay_sofort-white.svg"
        ></img>
        <img
          loading="lazy"
          alt="mastercard"
          src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/pay_mastercard-long-white.svg"
        ></img>
        <img
          loading="lazy"
          alt="visa"
          src="https://solarops.s3.eu-west-1.amazonaws.com/sonnenspiele/images/de/pay_visa-white.svg"
        ></img>
      </div>
    </div>
  );
}

export default Payment;
