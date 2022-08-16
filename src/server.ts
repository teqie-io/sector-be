import express from 'express';
import payload from 'payload';

const passport = require("passport");
import {generateAccessToken} from './token';

require('./authentication/jwt');
require('./authentication/google');
require('./authentication/facebook');

require('dotenv').config();
const app = express();

app.use(passport.initialize());

function generateUserToken(req, res) {
    const accessToken = generateAccessToken(req.user.id);
    res.send(accessToken);
}

app.get('/api/authentication/google/start',
    passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
app.get('/api/authentication/google/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken);

app.get('/api/authentication/facebook/start',
    passport.authenticate('facebook', { session: false }));
app.get('/api/authentication/facebook/redirect',
    passport.authenticate('facebook', { session: false }),
    generateUserToken);

app.get('/api/insecure', (req, res) => {
    res.send('Insecure response');
});

app.get('/api/secure',
    passport.authenticate(['jwt'], { session: false }),
    (req, res) => {
        res.send('Secure response from ' + JSON.stringify(req));
    });

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
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    payload.logger.info(`Payload API URL: ${payload.getAPIURL()}`)
  },
})

app.listen(process.env.PORT || 3000);
