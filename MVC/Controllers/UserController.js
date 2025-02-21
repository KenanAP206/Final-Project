import { UserModel } from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const secretKey = "SECRETKEY";

const transporter = nodemailer.createTransport({
    direct: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user:"kanansk-af206@code.edu.az",
      pass:"dkes xrvd ebqj oidz"
    },
    secure: true,
});

export const UserController = {
  getList: async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json({ data: users, total: users.length });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // React Admin için doğru format
      const formattedUser = {
        ...user.toObject(),
        id: user._id
      };
      res.json({ data: formattedUser });
    } catch (error) {
      console.error('GetOne Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const hashpassword = await bcrypt.hash(req.body.password, 10);
      const user = new UserModel({ ...req.body, password: hashpassword });      
      const savedUser = await user.save();
      const formattedUser = {
        ...savedUser.toObject(),
        id: savedUser._id
      };
      res.status(201).json({ data: formattedUser });
    } catch (error) {
      console.error('Create Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const formattedUser = {
        ...user.toObject(),
        id: user._id
      };
      res.json({ data: formattedUser });
    } catch (error) {
      console.error('Update Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const formattedUser = {
        ...user.toObject(),
        id: user._id
      };
      res.json({ data: formattedUser });
    } catch (error) {
      console.error('Delete Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteMany: async (req, res) => {
    const { ids } = req.body; 
    try {
        const responses = await Promise.all(
            ids.map(id => UserModel.findByIdAndDelete(id)) 
        );
        res.json({ data: responses.map(user => user._id) });
    } catch (error) {
        console.error('DeleteMany Error:', error);
        res.status(500).json({ error: error.message }); 
    }
  },

  getMany: async (resource, params) => {
    const { ids } = params;
    const responses = await Promise.all(
        ids.map(id => 
            httpClient(`http://localhost:3000/${resource}/${id}`)
        )
    );
    return {
        data: responses.map(({ json }) => ({
            ...json,
            id: json._id
        }))
    };
  },

  getManyReference: async (resource, params) => {
    const { target, id, pagination, sort, filter } = params;
    const { page, perPage } = pagination;
    const { field, order } = sort;
    
    const url = `http://localhost:3000/${resource}?${target}=${id}&page=${page}&limit=${perPage}&sortBy=${field}&order=${order}`;
    
    const { json, headers } = await httpClient(url);
    
    return {
        data: json.data.map(item => ({
            ...item,
            id: item._id
        })),
        total: json.total
    };
  },

  register: async (req, res) => {
    const { email, username, password } = req.body;
    const user = await UserModel.find({ email: email });
    if (user.length !== 0) {
      return res.send("Bu User sistemde var");
    } else {
      let hashpassword = await bcrypt.hash(password, 10);
      let confirmCode = Math.floor(Math.random() * 999999);
      let newUser = new UserModel({
        username,
        password: hashpassword,
        email,
        confirmPassword: confirmCode
      });

      await newUser.save();
      await transporter.sendMail({
        to: email,
        subject: "Onay Kodu",
        text: `Onay kodunuz: ${confirmCode}`,
      });
      res.send(newUser);
    }
  },

  login: async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        }
        
        let isTruePassword = await bcrypt.compare(password, user.password);
        if (!isTruePassword) {
            return res.status(401).json({ error: "Şifre yanlış" });
        }
        
        // Onay kodu oluştur ve kaydet
        let confirmCode = Math.floor(Math.random() * 999999);
        user.confirmPassword = confirmCode;
        await user.save();

        // Email gönder
        await transporter.sendMail({
            to: user.email,
            subject: "Onay Kodu",
            html: `<h1>Onay Kodunuz: ${confirmCode}</h1>`,
        });

        // Başarılı yanıt
        res.status(200).json({
            success: true,
            message: "Onay kodu email adresinize gönderildi",
            userId: user._id
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
  },

  confirm: async (req, res) => {
    try {
        let { confirmPassword, isFromRegister } = req.body;
        let user = await UserModel.findOne({ confirmPassword: confirmPassword });
        
        if (!user) {
            return res.status(400).json({ error: "Geçersiz onay kodu" });
        }

        // Onay kodunu sıfırla
        user.confirmPassword = null;
        await user.save();

        // Eğer register'dan geliyorsa token oluşturma
        if (isFromRegister) {
            return res.status(200).json({
                success: true,
                message: "Email doğrulama başarılı"
            });
        }

        // Login'den geliyorsa token oluştur
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email,
                role: user.role ,
                image: user.image
            }, 
            secretKey, 
            { expiresIn: "2d" }
        );

        res.status(200).json({
            success: true,
            token: token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                image: user.image
            }
        });
    } catch (error) {
        console.error('Confirmation error:', error);
        res.status(500).json({ error: error.message });
    }
  },

  checkAuth: async (req, res) => {
    try {
        // Since AuthMiddleware already verified the token and set req.user
        // We just need to return a success response
        res.status(200).json({ 
            authenticated: true,
            user: req.user 
        });
    } catch (error) {
        res.status(401).json({ 
            authenticated: false,
            error: error.message 
        });
    }
  },

  resetPassword: async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      const user = await UserModel.findByIdAndUpdate(
        id,
        { password: hashPassword },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'Password reset successfully', data: { id: user._id } });
    } catch (error) {
      console.error('ResetPassword Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

}; 