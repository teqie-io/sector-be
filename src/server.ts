import express from 'express';
import payload from 'payload';

import passport from 'passport';
import { generateAccessToken } from './token';
import { passportFacebookStrategy, passportGoogleStrategy } from './authentication';

require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const PaymentController = require('./controllers/payment-controller');

passport.use(passportFacebookStrategy);
passport.use(passportGoogleStrategy);

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function generateUserToken(req, res) {
    const accessToken = generateAccessToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}?access-token=${accessToken}`);
}

app.get(
    '/api/authentication/google/start',
    passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] })
);
app.get('/api/authentication/google/redirect', passport.authenticate('google', { session: false }), generateUserToken);

app.get('/api/authentication/facebook/start', passport.authenticate('facebook', { session: false }));
app.get(
    '/api/authentication/facebook/redirect',
    passport.authenticate('facebook', { session: false }),
    generateUserToken
);

// Payment
app.post('/api/payment', PaymentController.payment);

// Redirect root to Admin panel
app.get('/', (_, res) => {
    res.redirect('/admin');
});

// Initialize Payload
payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        payload.logger.info(`Payload API URL: ${payload.getAPIURL()}`);
    }
});

app.listen(process.env.PORT || 3000);
