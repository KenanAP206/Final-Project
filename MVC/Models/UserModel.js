import { Schema, model } from 'mongoose';

let UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'user', 'editor'],
    default: 'user',
    required: true 
  }
});

export let UserModel = model('User', UserSchema); 