import payload from 'payload';

import passportGoogle from 'passport-google-oauth';

require('dotenv').config();

const passportConfig = {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: `${process.env.HOSTNAME}/api/authentication/google/redirect`
};

const passportGoogleStrategy = new passportGoogle.OAuth2Strategy(
    passportConfig,
    async (request, accessToken, refreshToken, profile, done) => {
        const { displayName, emails, name, id } = profile;
        const email = emails.filter(({ verified }) => verified)[0].value;

        let user = (
            await payload.find({
                collection: 'user',
                where: {
                    googleId: {
                        equals: id
                    }
                }
            })
        ).docs[0];

        let userByEmail = (
            await payload.find({
                collection: 'user',
                where: {
                    email: {
                        equals: email
                    }
                }
            })
        ).docs[0];

        // user with email exist, but not connect to Google
        if (!user && userByEmail) {
            user = await payload.update({
                collection: 'user',
                id: userByEmail.id,
                data: {
                    googleId: id
                }
            });
        }
        // email also doesn't exist
        else if (!user) {
            user = await payload.create({
                collection: 'user',
                data: {
                    displayName,
                    email,
                    fullName: name.familyName && name.givenName ? `${name.familyName} ${name.givenName}` : undefined,
                    googleId: id,
                    password: 'later-fix'
                }
            });
        }
        return done(null, user);
    }
);

export default passportGoogleStrategy;
