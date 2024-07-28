import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import env from '../env';


const i = "";
const s = "";
const a = "";



const optionsToken: SignOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '10h',
    algorithm: 'PS512'
}

export const sign = async (payload: object) => {
    try {
        const privateKey = env.KEY_SECRET ?? 's'
        return jwt.sign(payload, privateKey, optionsToken)

    } catch (error) {

    }
}
