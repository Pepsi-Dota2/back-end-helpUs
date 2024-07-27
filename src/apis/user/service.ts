import sqlClient from "../../utils/db"

export const getUserService = async (data: { userId: number; username: string; password: string; }) => {
    try {
        const qry = await sqlClient.query(`SELECT * FROM user`,)
        const user = qry;
        if (!user) {
            console.log("Not Found")
        }
        return user[0]
    } catch (error) {
        return error
    }
}

export const createUserService = async (data: { username: string, password: string, email: string }) => {
    try {
        const qry = `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`;
        const param = [data.username, data.password, data.email];
        const user = await sqlClient.query(qry, param);
        return user;

    } catch (error) {
        console.error(error);
        return error;
    }
}

export const findOneUserService = async (data: { tel: string }) => {
    try {
        const qry = "SELECT * FROM user WHERE userId";
        const param = [data.tel]
        const user = await sqlClient.query(qry, param)
        return user
    } catch (err) {
        throw err
    }
}



export const userLoginService = async (data: { email: string, password: string }) => {
    try {
        const qry = "SELECT userId, email , password FROM user WHERE email=? AND password=?";
        const userLogin = await sqlClient.query(qry);
        if (!userLogin) {
            console.log("Not Found")
        }
        if (!data.email && !data.password) {
            return console.log("email or password invalid")
        }
        return userLogin[0]
    } catch (error) {

    }
}

export const userUpdateService = async (data: {}) => {

}