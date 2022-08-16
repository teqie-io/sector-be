import payload from "payload";

import passport from "passport";
import passportFacebook from 'passport-facebook';

require('dotenv').config();

const passportConfig = {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET,
    callbackURL: 'http://localhost:3000/api/authentication/facebook/redirect'
};

if (passportConfig.clientID) {
    passport.use(new passportFacebook.Strategy(passportConfig, async (accessToken, refreshToken, profile, done) => {
        let user = await payload.find({
            collection: 'user',
            where: {
                facebookId: {
                    equals: profile.id
                }
            }
        });
        if (!user) {
            user = await payload.create({
                collection: 'user',
                data: {
                    fullName: profile.displayName,
                    googleId: profile.id,
                }
            })
        }
        return done(null, user);
    }));
}