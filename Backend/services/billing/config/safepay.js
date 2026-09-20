import Safepay from "@sfpy/node-core";
import dotenv from "dotenv";
dotenv.config();

const safepay = new Safepay(process.env.SAFEPAY_SECRET_KEY, {
  authType: "secret",
  host: "https://sandbox.api.getsafepay.com",
});

export default safepay

