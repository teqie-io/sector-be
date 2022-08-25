import payload from 'payload';
import express from "express";
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkout = async (req: express.Request, res: express.Response, next) => {
    const checkout = req.body;
    let line_items = [];
    for(let i = 0; i < checkout.products.length; i++) {
        const p = checkout.products[i];
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
                success_url: 'http://localhost:3001/checkout-result?status=success',
                cancel_url: 'http://localhost:3001/checkout-result?status=cancel'
            }
        );
        console.log(session);
    } catch (ex) {
        payload.logger.error(ex);
    }
}

module.exports = {
    checkout
};