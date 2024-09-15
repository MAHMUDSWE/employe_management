import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  email: { type: String, unique: true },
  phone: String,
  date: String,
});

const Users = models.user || model("user", userSchema);

export default Users;
