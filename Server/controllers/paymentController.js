const Stripe = require('stripe');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

const createPaymentIntent = async (req, res) => {
    try {
        if (!stripe) {
            return res.status(500).json({ error: 'Stripe is not configured on the server' });
        }

        const { amount, currency = 'pkr' } = req.body;
        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({ error: 'Invalid payment amount' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(numericAmount * 100),
            currency: String(currency).toLowerCase(),
            automatic_payment_methods: { enabled: true },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message || 'Failed to create payment intent' });
    }
};

module.exports = {
    createPaymentIntent,
};
