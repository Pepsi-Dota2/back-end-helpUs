import mysql from "mysql2"
import env from "../env"

const pool = mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_SCHEMA,
})

pool.getConnection(error => {
    if (error) throw error;
    console.log("SuccessFully connected to the database")
})

const sqlClient = pool.promise();
export default sqlClient
