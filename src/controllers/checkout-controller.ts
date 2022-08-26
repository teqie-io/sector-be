import payload from 'payload';
import express from "express";
import Stripe from 'stripe';
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req: express.Request, res: express.Response, next) => {
    // const checkout = req.body;
    // let line_items = [];
    // for(let i = 0; i < checkout.products.length; i++) {
    //     const p = checkout.products[i];
    //     line_items.push(
    //         {
    //             price_data: {
    //                 currency: 'usd',
    //                 product_data: {
    //                     name: p.name,
    //                     images: [p.image]
    //                 },
    //                 unit_amount: p.price
    //             },
    //             quantity: p.quantity
    //         }
    //     );
    // }
    try {
        // const session = await stripe.checkout.sessions.create(
        //     {
        //         payment_method_types: ['card'],
        //         line_items,
        //         mode: 'payment',
        //         success_url: 'http://localhost:3001/checkout-result?status=success',
        //         cancel_url: 'http://localhost:3001/checkout-result?status=cancel'
        //     }
        // );
        // console.log(session);
        // Create a PaymentIntent with the order amount and currency.
        const params: Stripe.PaymentIntentCreateParams = {
            amount: 5999,
            currency: 'usd',
            payment_method_types: ['card'],
        };
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
            params
        );

        console.log(paymentIntent)


        // Send publishable key and PaymentIntent client_secret to client.
        res.send({
            clientSecret: paymentIntent.client_secret,
            nextAction: paymentIntent.next_action,
        });
    } catch (ex) {
        payload.logger.error(ex);
        
        res.status(400).send({
            error: {
                message: ex.message,
            }
        });
    }
}

module.exports = {
    createPaymentIntent
};