import { UserModel } from '../Models/UserModel.js';

export const UserController = {
  getList: async (req, res) => {
    try {
      const { page = 1, perPage = 10, sortBy, order } = req.query;
      
      // Create sort object based on sortBy and order parameters
      const sort = {};
      if (sortBy && order) {
        sort[sortBy] = order.toLowerCase() === 'desc' ? -1 : 1;
      } else {
        sort._id = 1; // default sorting
      }
      const users = await UserModel.find()
        .sort(sort)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));
      
      const total = await UserModel.countDocuments();

      // React Admin için doğru format
      const formattedUsers = users.map(user => ({
        ...user.toObject(),
        id: user._id
      }));

      // Content-Range header'ını ekle
      res.set('Content-Range', `users ${(page - 1) * perPage}-${page * perPage}/${total}`);
      res.set('Access-Control-Expose-Headers', 'Content-Range');
      
      res.json({
        data: formattedUsers,
        total: total
      });
    } catch (error) {
      console.error('GetList Error:', error);
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
  }
}; 