import { Schema, model } from 'mongoose';

let UserSchema = new Schema({
  username: { type: String, required: true },
  image: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: Number,
  role: { 
    type: String, 
    enum: ['admin', 'user', 'editor'],
    default: 'user',
    required: true 
  },
  description: { type: String },
  favorites: { type: [String], default: [] },
  watched : { type: [String], default: [] }

});

export let UserModel = model('User', UserSchema); 