
import { prismaClient } from "../../prisma";
import { TCreateUserParams } from "./type";

export const getUserService = async (data: { userId: number }) => {
   console.log(data)
    try {
        const users = await prismaClient.users.findFirst({
            where: {
                userId: data.userId
            }
        })
        if (!users) {
            console.log("Not Found")
        }   
     
        return users
    } catch (error) {
        return error
    }
}

export const createUserService = async (data: TCreateUserParams) => {
    console.log(data)
    try {
        const user = await prismaClient.users.create({
            data: {
                email: data.email,
                username: data.username,
                password: data.password,
                tel: data.tel
            }
        })
        console.log(user)
        return user;

    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}


export const findOneUserService = async (data: { tel: string }) => {
    try {
        const user = await prismaClient.users.findFirst({ where: { tel: data.tel } })
        return user
    } catch (err) {
        throw err
    }
}


export const userUpdateService = async (data: {}) => {

}