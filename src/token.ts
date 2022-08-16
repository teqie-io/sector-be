const jwt = require('jsonwebtoken');

require('dotenv').config();

function generateAccessToken(userId) {
    const expiresIn = '1 hour';
    const secret = process.env.JWT_SIGNING_KEY;
    const issuer = process.env.JWT_ISSUER;
    const audience = process.env.JWT_AUDIENCE;

    return jwt.sign({}, secret, {
        expiresIn: expiresIn,
        audience: audience,
        issuer: issuer,
        subject: userId ? userId.toString() : "abc"
    });
}

export { generateAccessToken };