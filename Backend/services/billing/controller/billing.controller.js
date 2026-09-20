import { PLANS } from "../config/plan.js";
import safepay from "../config/safepay.js";
import Payment from "../models/billing.model.js";
import axios from 'axios'

export const createOrder = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { plan } = req.body;

    const selectedPlan = PLANS[plan];

    if (!selectedPlan) {
      return res.status(400).json({ message: "plan not found" });
    }
    const orderId = `ORD-${Date.now()}`;
    //Step 1 - create payment session
    const response = await safepay.payments.session.setup({
      merchant_api_key: process.env.SAFEPAY_API_KEY,
      intent: "CYBERSOURCE",
      mode: "payment",
      entry_mode: "raw",
      currency: "PKR",
      amount: selectedPlan.amount * 100,
      receipt: `receipt-${Date.now()}`,

      metadata: {
        order_id: orderId,
      },
    });

    //Step 2 - Get Tracker
    const tracker = response.data.tracker.token;
    console.log(`tracker: ${tracker}`);

    //Step 3 - Get Authentication Token
    const authResponse = await safepay.client.passport.create({
      tracker: tracker,
    });

    const authToken = authResponse.data;
    console.log(`authToken: ${authToken}`);

    //Step 4 - Create Checkout URL

    const checkoutURL = safepay.checkout.createCheckoutUrl({
      tracker: tracker,
      tbt: authToken,
      env: "sandbox",
      source: "hosted",
      redirect_url: process.env.SUCESS_REDIRECT_URL,
      cancel_url: process.env.CANCEL_REDIRECT_URL,
    });

    console.log("Checkout URL:", checkoutURL);

    // 5. Save your payment record
    const payment = await Payment.create({
      userId,
      orderId,
      amount: selectedPlan.amount,
      credits: selectedPlan.credits,
      plan: selectedPlan.id,
      currency: "PKR",
      status: "created",
      safepayTracker: tracker,
    });
    console.log("Payment saved:", payment._id);

    // 6. Send checkout URL to frontend
    return res
      .status(200)
      .json({ orderId, tracker, checkoutURL, plan: selectedPlan });

    

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: `create order error: ${error}`,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { tracker } = req.body;
    if (!tracker) {
      return res.status(400).json({ message: `tracker required` });
    }

    console.log(`verifying Tracker: ${tracker}`);

    const response = await safepay.reporter.payments.fetch(tracker);

    const paymentData = response.data;
    console.log("Safepay state:", paymentData.state);
    // 2. Payment successful hai ya nahi
    //  . Safepay attempt bhi successful hona chahiye
    const attempt = paymentData.attempts?.find(
      (attempt) => attempt.is_success === true,
    );

    if (paymentData.state !== "TRACKER_ENDED" || !attempt) {
    return res.status(400).json({
        success: false,
        message: "Payment is not completed",
        state: paymentData.state,
    });
}
  
    
    // 3. Tracker ke through apni payment find karo
    const payment = await Payment.findOne({
      safepayTracker: tracker,
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment record not found",
      });
    }

    // 4. Already paid hai to dobara credits mat dena
    if (payment.status === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        payment,
      });
    }

    // 5. DB status update
    payment.status = "paid";
    payment.paymentId = paymentData.charge?.token;

    await payment.save();

    await axios.post(`${process.env.AUTH_SERVICE}/update-plan`,{userId:payment.userId,plan:payment.plan,credits:payment.credits})

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });

  } catch (error) {
    console.log("Verification error:", error);

    return res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
