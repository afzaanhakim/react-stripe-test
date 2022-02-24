import React from "react";
import "./pay.css";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect,  } from "react";
import {useNavigate} from "react-router";
import axios from "axios";

const STRIPE_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const history = useNavigate()

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        history("/success")
      } catch (error) {
        console.log("is error", error);
      }
    };
    stripeToken && makeRequest()
  }, [stripeToken]);
  return (
    <div className="pay-container">
      <div className="pay-button-container">
        {stripeToken ? (<span>Processing, please wait</span>) :(

          <StripeCheckout
          name="funsell"
          image="https://www.retaildetail.nl/sites/default/files/news/big-bazar-logo%20rgb-zonder-kleurvlak.jpg"
          billingAddress
          shippingAddress
          description="your total is $20"
          amount={2000}
          token={onToken}
          stripeKey={STRIPE_KEY}
          >
          <button>Pay Now</button>
          
        </StripeCheckout>
          )}
      </div>
    </div>
  );
};

export default Pay;
