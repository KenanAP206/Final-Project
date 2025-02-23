import express from 'express';
import { UserController } from '../Controllers/UserController.js';
import AuthMiddleware from '../Middlewares/AuthMiddleware.js';
import AdminMiddleware from '../Middlewares/AdminMiddleware.js';

export const userRouter = express.Router();

userRouter.get("/",UserController.getList);

userRouter.get("/:id",AuthMiddleware, UserController.getOne);

userRouter.post("/register", UserController.register);

userRouter.post("/login", UserController.login);

userRouter.post("/confirm", UserController.confirm);

userRouter.put("/:id",AuthMiddleware, UserController.update);

userRouter.delete("/:id",AuthMiddleware,AdminMiddleware, UserController.delete);

userRouter.delete("/",AuthMiddleware,AdminMiddleware, UserController.deleteMany);

userRouter.post("/",AuthMiddleware,AdminMiddleware, UserController.create);

userRouter.put("/:id/reset-password",AuthMiddleware, UserController.resetPassword);     

userRouter.get("/check-auth", UserController.checkAuth);

userRouter.post('/create-checkout-session', AuthMiddleware, UserController.createCheckoutSession);

userRouter.post('/webhook', express.raw({ type: 'application/json' }), UserController.handleWebhook);
