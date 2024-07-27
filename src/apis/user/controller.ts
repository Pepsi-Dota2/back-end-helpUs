import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createUserService, findOneUserService, getUserService, userLoginService } from './service';
import { encrypt } from '../../utils/crypt';


export const getUserController = async (req: Request, res: Response) => {
    try {

        const userId = Number(req.body.id);
        const username = req.body.username;
        const password = req.body.password;
        const users = await getUserService({ userId, username, password });

        if (!users) {
            return res.status(400).json({ error: 'Invalid user' });
        }
        return res.json({
            status: "Success",
            message: "Have user data",
            users
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createUserController = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const pass = req.body.password;
        const tel = req.body.tel;

        const user = await findOneUserService({ tel })
        if (user) {
            return res.json({
                status: 'error',
                message: 'ໝາຍເລກໂທລະສັບນີ້ມີໃນລະບົບແລ້ວ'
            })
        }


        const password = encrypt(pass)
        const create = await createUserService({ username, email, password })
        if (!create) {
            return res.json({
                status: 'error',
                message: 'ການສ້າງຜູ້ໃຊ້ງານ ຜິດພາດ ລອງໃໝ່ໃນພາຍຫຼັງ'
            })
        }
        return res.json({
            status: 'success',
            message: 'ການສ້າງຜູ້ໃຊ້ງານ ສຳເລັດແລ້ວ'
        })

    } catch (error) {
        throw error

    }
}

export const userLoginController = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await userLoginService({ email, password })
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // const passwordMatch = await bcrypt.compare(password, user.password)
        // if (!passwordMatch) {
        //     return res.status(401).json({ error: 'Authentication failed' });
        // }
        if (user) {
            return res.status(202).json({
                status: "Success",
                message: "Login Success",
                user
            });
        }
    } catch (error) {
        console.error('user or password invalid', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateUserController = async () => {

}