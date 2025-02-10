import {ShowModel} from '../Models/ShowModel.js';

export const ShowController = {
  getAll: async (req, res) => {
    let shows = await ShowModel.find();
    res.send(shows);
  },
  getById: async (req, res) => {
    let id = req.params.id;
    let myshow = await ShowModel.findById(id);
    res.send({
      message: 'Success GetById',
      data: myshow
    });
  },
  deleteShow: async (req, res) => {
    let { id } = req.params;
    await ShowModel.findByIdAndDelete(id);
    res.send({
      message: 'Success Delete'
    });
  },
  putShow: async (req, res) => {
    let { id } = req.params;
    let putShow = req.body;
    let putedShow = await ShowModel.findByIdAndUpdate({ _id: id }, putShow);
    res.send(putedShow);
  },
  postShow: async (req, res) => {
    let newShow = ShowModel(req.body);
    await newShow.save();
    res.send({
      message: 'Success Post',
      data: req.body
    });
  }
};