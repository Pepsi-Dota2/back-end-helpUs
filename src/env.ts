import * as dotenv from 'dotenv'

dotenv.config()
export default {
    DB_PORT: parseInt(process.env.DB_PORT || '3306'),
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_SCHEMA: process.env.DB_SCHEMA,
    BASE_PATH: `${process.env.BASE_PATH}`,
    KEY_SECRET : process.env.KEY_SECRET,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY
}