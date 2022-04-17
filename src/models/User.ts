import { Document, Schema, model } from "mongoose";

/**
 * User model
 */
export interface IUser extends Document {
  name: string;
  fsurname: string;
  lsurname: string;
  age: number;
  username: string;
  password: string;
  expedient: string;
  role: string;
}

/**
 * User schema
 * @param name - type: string, required: true, trim: true
 * @param fsurname - type: string, required: true, trim: true
 * @param lsurname - type: string, required: true, trim: true
 * @param age - type: number, required: true
 * @param username - type: string, required: true, trim: true, unique: true
 * @param password - type: string, required: true, trim: true
 * @param role - type: string, required: true, trim: true
 **/
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  fsurname: {
    type: String,
    required: true,
    trim: true,
  },
  lsurname: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  expedient: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model<IUser>("User", UserSchema);
