import { Schema, model } from 'mongoose';

let ShowSchema = new Schema({
  name: String,
  desc: String,
  year: Number,
  type:String,
  sort:String,
  age_rating:String,
  quality:String,
  category:String,
  duration:String,
  staring:String,
  language:String,
  subtitles:String,
  date_aired:Number,
  director:String,
  premium: Boolean,
  rating: Number,
  views: Number,
  country:String,
  genre:String,
  premiered:String,
  image: String,
  trailer: String,
  isNew: Boolean
});

export let ShowModel = model('shows', ShowSchema);