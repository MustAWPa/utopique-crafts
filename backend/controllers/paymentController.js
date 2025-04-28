// backend/controllers/paymentController.js

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // amount should be in cents

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe Payment Error:', error);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};
