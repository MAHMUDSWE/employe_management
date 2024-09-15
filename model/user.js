import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    avatar: String,
    email: { type: String, unique: true },
    phone: Number,
    date: String
});

const Users = models.user || model('user', userSchema);

export default Users;