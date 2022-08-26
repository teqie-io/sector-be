import payload from 'payload';
<<<<<<< HEAD:src/controllers/checkout-controller.ts
import express from "express";
import Stripe from 'stripe';
=======
>>>>>>> parent of 4b96486 (Update collection checkout):src/controllers/payment-controller.ts
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

<<<<<<< HEAD:src/controllers/checkout-controller.ts
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
=======
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
>>>>>>> parent of 4b96486 (Update collection checkout):src/controllers/payment-controller.ts
    }
}

module.exports = {
<<<<<<< HEAD:src/controllers/checkout-controller.ts
    createPaymentIntent
=======
    payment
>>>>>>> parent of 4b96486 (Update collection checkout):src/controllers/payment-controller.ts
};