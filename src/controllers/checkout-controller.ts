import payload from 'payload';
import express from "express";
import Stripe from 'stripe';
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req: express.Request, res: express.Response, next) => {
    try {
        const amount = req.body.totalAmount;
        const currency = req.body.currency;
        const paymentMethodType = req.body.paymentMethodType;
        console.log(req.body);
        const params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency,
            payment_method_types: [paymentMethodType],
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
    }
}

module.exports = {
    createPaymentIntent
};