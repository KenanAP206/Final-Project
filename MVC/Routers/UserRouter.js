import express from 'express';
import { UserController } from '../Controllers/UserController.js';
import AuthMiddleware from '../Middlewares/AuthMiddleware.js';
import AdminMiddleware from '../Middlewares/AdminMiddleware.js';

export const userRouter = express.Router();

// Kullanıcı listesi alma
userRouter.get("/",UserController.getList);

// Tek bir kullanıcıyı alma
userRouter.get("/:id",AuthMiddleware, UserController.getOne);

// Kullanıcı kaydı
userRouter.post("/register", UserController.register);

// Kullanıcı girişi
userRouter.post("/login", UserController.login);

// Onay kodu doğrulama
userRouter.post("/confirm", UserController.confirm);

// Kullanıcı güncelleme
userRouter.put("/:id",AuthMiddleware, UserController.update);

// Kullanıcı silme
userRouter.delete("/:id",AuthMiddleware,AdminMiddleware, UserController.delete);

// Birden fazla kullanıcı silme
userRouter.delete("/",AuthMiddleware,AdminMiddleware, UserController.deleteMany);

// Kullanıcı oluşturma
userRouter.post("/",AuthMiddleware,AdminMiddleware, UserController.create);

// Kullanıcı şifresini sıfırlama
userRouter.put("/:id/reset-password",AuthMiddleware, UserController.resetPassword);     

userRouter.get("/check-auth", UserController.checkAuth);

