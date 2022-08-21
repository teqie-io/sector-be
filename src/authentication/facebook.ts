import payload from 'payload';

import passportFacebook from 'passport-facebook';

require('dotenv').config();

const passportConfig = {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET,
    callbackURL: `${process.env.HOSTNAME}/api/authentication/facebook/redirect`
};

const passportFacebookStrategy = new passportFacebook.Strategy(
    passportConfig,
    async (accessToken, refreshToken, profile, done) => {
        const { displayName, name, id } = profile;
        console.log(displayName, name, id);
        let user = (
            await payload.find({
                collection: 'user',
                where: {
                    facebookId: {
                        equals: id
                    }
                }
            })
        ).docs[0];

        if (!user) {
            user = await payload.create({
                collection: 'user',
                data: {
                    displayName,
                    email: `${id}@fb.com`,
                    fullName:
                        name.familyName && name.givenName
                            ? `${name.familyName} ${name.middleName ? name.middleName + ' ' : ''}${name.givenName}`
                            : undefined,
                    facebookId: id,
                    password: 'later-fix'
                }
            });
        }
        return done(null, user);
    }
);

export default passportFacebookStrategy;
