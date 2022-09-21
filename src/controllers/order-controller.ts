import payload from 'payload';
import express from 'express';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req: express.Request, res: express.Response) => {
    payload.logger.info(
        `START POST--------------- /orders/create-payment-intent with data: ${JSON.stringify(req.body)}`
    );
    let jsonData: any = {
        status: -1,
        message: 'Unknown error'
    };
    const { totalAmount, currency, paymentMethodType } = req.body;
    const amount: number = Number.parseFloat(totalAmount.toFixed(2)) * 100;
    try {
        const params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency,
            payment_method_types: [paymentMethodType]
        };
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params);

        // Send publishable key and PaymentIntent client_secret to client.
        jsonData = {
            status: 0,
            message: 'Success',
            data: {
                clientSecret: paymentIntent.client_secret,
                nextAction: paymentIntent.next_action
            }
        };
        res.send(jsonData);
    } catch (ex) {
        payload.logger.error(ex.message);
        jsonData = {
            status: 99,
            message: 'System error'
        };
        res.status(400).send(jsonData);
    } finally {
        payload.logger.info(
            `END POST--------------- /orders/create-payment-intent with response: ${JSON.stringify(jsonData)}`
        );
    }
};

const confirmPayment = async (req: express.Request, res: express.Response) => {
    payload.logger.info(`START POST--------------- /orders/confirm-payment with data: ${JSON.stringify(req.body)}`);
    let jsonData: any = {
        status: -1,
        message: 'Unknown error'
    };
    const reqObj = req.body;
    try {
        const ordersObj = (
            await payload.find({
                collection: 'orders',
                where: {
                    transactionId: {
                        equals: reqObj.orders.transactionId
                    }
                }
            })
        ).docs[0];

        let shippingId: string;
        if (!reqObj.shippings.id) {
            shippingId = uuidv4();
            await payload.create({
                collection: 'shippings',
                data: {
                    ...reqObj.shippings,
                    id: shippingId
                }
            });
        } else {
            shippingId = reqObj.shippings.id;
        }

        if (!ordersObj) {
            await payload.create({
                collection: 'orders',
                data: {
                    ...reqObj.orders,
                    type: 'card',
                    paymentMethod: 'stripe_card',
                    checkoutTime: new Date().toISOString(),
                    shipping: shippingId
                }
            });
        }
        
        jsonData = {
            status: 0,
            message: 'Success'
        }
        res.send(jsonData);
    } catch (ex) {
        payload.logger.error(ex.message);
        jsonData = {
            status: 99,
            message: 'System error'
        };
        res.status(400).send(jsonData);
    } finally {
        payload.logger.info(
            `END POST--------------- /orders/confirm-payment with response: ${JSON.stringify(jsonData)}`
        );
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment
};
