import payload from "payload";

import passport from 'passport';
import passportJwt from 'passport-jwt';

require('dotenv').config();

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT_SIGNING_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
};

passport.use(new passportJwt.Strategy(jwtOptions, async (res, done) => {
    const user = await payload.find({
        collection: 'user',
        where: {
            email: {
                equals: res.sub
            }
        }
    });
    if (user) {
        return done(null, user, res);
    }
    return done();
}));