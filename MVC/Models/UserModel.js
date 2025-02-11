import { Schema, model } from 'mongoose';

let UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // diğer alanlar...
});

export let UserModel = model('User', UserSchema); 