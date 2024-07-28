import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createUserService, findOneUserService, getUserService } from './service';
import { decrypt, encrypt } from '../../utils/crypt';


export const getUserController = async (req: Request, res: Response) => {
    try {

        const userId = Number(req.body.id);
        const users = await getUserService({ userId });

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
        const password = req.body.password;
        const tel = req.body.tel;

        const user = await findOneUserService({ tel })
        if (user) {
            return res.json({
                status: 'error',
                message: 'ໝາຍເລກໂທລະສັບນີ້ມີໃນລະບົບແລ້ວ'
            })
        }
        // const password = encrypt(pass)
        const create = await createUserService({ username, password, tel, email })
        if (!create) {
            return res.json({
                status: 'error',
                message: 'ການສ້າງຜູ້ໃຊ້ງານ ຜິດພາດ ລອງໃໝ່ໃນພາຍຫຼັງ'
            })
        }
        return res.json({
            status: 'success',
            message: 'ການສ້າງຜູ້ໃຊ້ງານ ສຳເລັດແລ້ວ',
            create
        })

    } catch (error) {
        throw error

    }
}

export const userLoginController = async (req: Request, res: Response) => {
    try {
        const tel = req.body.tel;
        const password = req.body.password;
        const user = await findOneUserService({ tel })
        if (!user) {
            return res.json({
                status: 'error',
                message: 'ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້ງານ'
            })
        }
        if (decrypt(user.password) !== password) {
            return res.json({
                status: 'error',
                message: 'ໝາຍເລກໂທລະສັບ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ'
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        // const token = await
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        return res.status(202).json({
            status: "Success",
            message: "Login Success",
            user
        });

    } catch (error) {
        console.error('user or password invalid', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateUserController = async () => {

}
function userLoginService(arg0: { email: any; password: any; }) {
    throw new Error('Function not implemented.');
}

