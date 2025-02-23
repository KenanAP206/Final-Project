import {ShowModel} from '../Models/ShowModel.js';

export const ShowController = {
  getAll: async (req, res) => {
    try {
      const { page = 1, perPage = 10, sortBy, order } = req.query;
      const sort = {};
      if (sortBy && order) {
        sort[sortBy] = order.toLowerCase() === 'desc' ? -1 : 1;
      } else {
        sort._id = 1; 
      } 
      
      const shows = await ShowModel.find()
        .sort(sort)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));

      const total = await ShowModel.countDocuments();

      const formattedShows = shows.map(show => ({
        ...show.toObject(),
        id: show._id
      }));

      res.set('Content-Range', `shows ${(page - 1) * perPage}-${page * perPage}/${total}`);
      
      res.json({
        data: formattedShows,
        total: total
      });
    } catch (error) {
      console.error('GetAll Error:', error);
      res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const show = await ShowModel.findById(req.params.id);
      if (!show) {
        return res.status(404).json({ error: 'Show not found' });
      }
      const formattedShow = {
        ...show.toObject(),
        id: show._id
      };
      res.json({ data: formattedShow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteShow: async (req, res) => {
    try {
      const show = await ShowModel.findByIdAndDelete(req.params.id);
      if (!show) {
        return res.status(404).json({ error: 'Show not found' });
      }
      const formattedShow = {
        ...show.toObject(),
        id: show._id
      };
      res.json({ data: formattedShow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  putShow: async (req, res) => {
    try {
      const show = await ShowModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!show) {
        return res.status(404).json({ error: 'Show not found' });
      }
      const formattedShow = {
        ...show.toObject(),
        id: show._id
      };
      res.json({ data: formattedShow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  postShow: async (req, res) => {
    try {
      const newShow = new ShowModel(req.body);
      const savedShow = await newShow.save();
      const formattedShow = {
        ...savedShow.toObject(),
        id: savedShow._id
      };
      res.status(201).json({ data: formattedShow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteMany: async (req, res) => {
    try {
        const idsToDelete = req.query.ids ? JSON.parse(req.query.ids) : req.body.ids;
        
        if (!idsToDelete || !Array.isArray(idsToDelete)) {
            return res.status(400).json({ error: 'Invalid ids format' });
        }

        await ShowModel.deleteMany({ _id: { $in: idsToDelete } });
        res.json({ data: idsToDelete });
    } catch (error) {
        console.error('DeleteMany Error:', error);
        res.status(500).json({ error: error.message });
    }
  }
};