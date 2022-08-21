import jwt from 'jsonwebtoken';
import payload from 'payload';

require('dotenv').config();

export const generateAccessToken = (user) => {
    const { id, email } = user;
    const expiresIn = '2 hours';

    return jwt.sign(
        {
            email,
            id,
            collection: 'user'
        },
        payload.secret,
        {
            expiresIn
        }
    );
};
