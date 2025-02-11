import { UserModel } from '../Models/UserModel.js';

export const UserController = {
  getAll: async (req, res) => {
    const users = await UserModel.find();
    const total = await UserModel.countDocuments();

    // Eğer kullanıcı yoksa, uygun bir yanıt döndür
    if (users.length === 0) {
      res.set('Content-Range', 'users 0-0/0');
      return res.json({ data: [], total: 0 }); // Boş veri döndür
    }

    // Kullanıcıları 'id' anahtarı ile döndür
    const formattedUsers = users.map(user => ({
      id: user._id, // Mongoose'dan gelen _id'yi id olarak ayarlayın
      name: user.name,
      email: user.email,
      __v: user.__v
    }));

    res.set('Content-Range', `users 0-${formattedUsers.length - 1}/${total}`);
    res.json({ data: formattedUsers.data ? formattedUsers.data : formattedUsers, total: total}); // Yanıt formatını güncelle
  },
  getById: async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.json({data: user});
  },
  postUser: async (req, res) => {
    const user = new UserModel(req.body);
    await user.save();
    res.json(user);
  },
  putUser: async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  },
  deleteUser: async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  }
}; 