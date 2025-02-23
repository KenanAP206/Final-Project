import { UserModel } from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51QvduDGVEa9lUrQzToGJLwQRDXVy41QVsTQcRbhBs7NSPHzZ7eHp80u3INHSRmEVmcp46kMWsO4BmEXneEtWELf300Y4STM8bV");

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
        
        let confirmCode = Math.floor(Math.random() * 999999);
        user.confirmPassword = confirmCode;
        await user.save();

        await transporter.sendMail({
            to: user.email,
            subject: "Onay Kodu",
            html: `<h1>Onay Kodunuz: ${confirmCode}</h1>`,
        });

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

        user.confirmPassword = null;
        await user.save();

        if (isFromRegister) {
            return res.status(200).json({
                success: true,
                message: "Email doğrulama başarılı"
            });
        }

        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email,
                role: user.role ,
                image: user.image
            }, 
            secretKey, 
            { expiresIn: "1m" }
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
  createCheckoutSession: async (req, res) => {
    try {
      const userId = req.user.id; 
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product: 'prod_RpIeIDYd8ikSsK',
              unit_amount: 1000, 
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/payment-success',
        cancel_url: 'http://localhost:5173/payment-cancel',
        metadata: {
          userId: userId
        }
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Webhook handler
  handleWebhook: async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, 'whsec_b38bbfae325c876640b29c5e1c1e39c499e633b58224ccb3c41fc24b2de77a3a');
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const userId = event.data.object.metadata.userId;

        try {
            await UserModel.findByIdAndUpdate(userId, { ispremium: true });
            console.log(`User ${userId} is now premium!`);
    
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Failed to update user status' });
        }
    }

    res.json({ received: true });
  }
}; 