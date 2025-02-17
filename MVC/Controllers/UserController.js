import { UserModel } from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

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
      const user = new UserModel(req.body);
      const savedUser = await user.save();
      // React Admin için doğru format
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
      // React Admin için doğru format
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
      // React Admin için doğru format
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

  deleteMany: async (resource, params) => {
    const { ids } = params;
    const responses = await Promise.all(
        ids.map(id => 
            httpClient(`http://localhost:3000/${resource}/${id}`, {
                method: 'DELETE',
            })
        )
    );
    return { data: responses.map(({ json }) => json.id) };
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
      let newUser = new UserModel({
        username,
        password: hashpassword,
        email
      });

      await newUser.save();
      res.send(newUser);
    }
  },

  login: async (req, res) => {
    let { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.send("Register olmamisiniz");
    } else {
      let isTruePassword = await bcrypt.compare(password, user.password);
      if (!isTruePassword) {
        return res.send("Password dogru deyildir");
      } else {
        let confirmCode = Math.floor(Math.random() * 999999);
        user.confirmPassword = confirmCode;
        await user.save();

        const info = await transporter.sendMail({
          to: user.email,
          subject: "Hello ✔",
          text: "Hello world?",
          html: `<h1 style="color:red">Bu sizin confirm kodunuzdur ${confirmCode}</h1>`,
        });
      }
      res.send(user);
    }
  },

  confirm: async (req, res) => {
    let confirmPassword = req.body.confirmPassword;
    let user = await UserModel.findOne({ confirmPassword: confirmPassword });
    if (!user) {
      res.send("Sizin confirm password yalnisdir");
    } else {
      let token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: "1h" });
      res.send(token);
    }
  },

  checkAuth: async (req, res) => {
    // Kullanıcının oturum açıp açmadığını kontrol et
    if (req.isAuthenticated()) { // Eğer oturum açmışsa
        return res.status(200).json({ authenticated: true });
    } else {
        return res.status(401).json({ authenticated: false });
    }
  },
}; 