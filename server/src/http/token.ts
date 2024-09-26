import { env } from "./env";

const jwt = require('jsonwebtoken');
const secretKey: string = env.TOKEN_KEY;

export function generateToken(
    userId: string,
    name: string,
    email: string,
    beeKeeper: null | {}
) {
    const expiresIn = '30s';
    const payload = {
        id: userId,
        name: name,
        email: email,
        beeKeeper: beeKeeper
    };
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
};

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, error };
    }
}