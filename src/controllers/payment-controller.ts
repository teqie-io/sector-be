import payload from 'payload';
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res, next) => {
    const { payment } : any = req.body;
    let line_items = [];
    for(let i = 0; i < payment.products.length; i++) {
        const p = payment.products[i];
        line_items.push(
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: p.name,
                        images: [p.image]
                    },
                    unit_amount: p.amount
                },
                quantity: p.quantity
            }
        );
    }
    try {
        const session = await stripe.checkout.sessions.create(
            {
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: '',
                cancel_url: ''
            }
        );
    } catch (ex) {
        payload.logger.console.error(ex);
    }
}

module.exports = {
    payment
};