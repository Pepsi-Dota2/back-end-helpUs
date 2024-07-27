import { Router } from "express";
import { createUserController, getUserController, userLoginController } from "./apis/user/controller";


const router = Router()

router.get("/user", getUserController)
router.post("/user/create", createUserController)
router.post("/user/login", userLoginController)


export default router