import payload from 'payload';
import express from 'express';
import Stripe from 'stripe';

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req: express.Request, res: express.Response) => {
    const amount = req.body.totalAmount;
    const currency = req.body.currency;
    const paymentMethodType = req.body.paymentMethodType;
    try {
        const params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency,
            payment_method_types: [paymentMethodType]
        };
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params);

        // Send publishable key and PaymentIntent client_secret to client.
        res.send({
            clientSecret: paymentIntent.client_secret,
            nextAction: paymentIntent.next_action
        });
    } catch (ex) {
        payload.logger.error(ex);

        res.status(400).send({
            error: {
                message: ex.message
            }
        });
    }
};

const confirmPayment = async (req: express.Request, res: express.Response) => {
    const paymentObj = req.body;
    console.log(paymentObj);
    try {
        const checkoutObj = (
            await payload.find({
                collection: 'checkout',
                where: {
                    transactionId: {
                        equals: paymentObj.transactionId
                    }
                }
            })
        ).docs[0];
        if (!checkoutObj) {
            await payload.create({
                collection: 'checkout',
                data: {
                    ...paymentObj,
                    type: 'card',
                    paymentMethod: 'stripe_card',
                    checkoutTime: new Date().toISOString()
                }
            });
        }
        res.send({
            status: 'success'
        });
    } catch (ex) {
        payload.logger.error(ex);

        res.status(400).send({
            status: 'fail',
            error: ex.message
        });
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment
};
