import { HttpError } from "../lib/http-error";
import Users from "../model/user";

export async function getUsers(req, res) {
  const users = await Users.find({});
  return users;
}

export async function getUser(req, res) {
  const { userId } = req.query;

  const user = await Users.findById(userId);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user;
}

export async function postUser(req, res) {
  const { firstName, lastName, email, phone, date } = req.body;

  if (!firstName || !lastName || !email || !phone || !date) {
    throw new HttpError(400, "Missing form data");
  }

  const userData = { firstName, lastName, email, phone, date };

  return await Users.create(userData);
}

export async function putUser(req, res) {
  const { userId } = req.query;
  const userData = req.body;

  const user = await Users.findByIdAndUpdate(userId, userData, {
    new: true,
  });
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  return user;
}

export async function deleteUser(req, res) {
  const { userId } = req.query;

  const user = await Users.findByIdAndDelete(userId);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return { message: "User deleted successfully", user };
}

export async function searchUsers(req, res) {
  const { name, email, phone, date } = req.query;

  const searchCriteria = {};

  if (name) {
    searchCriteria.name = { $regex: name, $options: "i" }; // Case-insensitive match
  }
  if (email) {
    searchCriteria.email = { $regex: email, $options: "i" };
  }
  if (phone) {
    searchCriteria.phone = { $regex: phone, $options: "i" };
  }
  if (date) {
    searchCriteria.date = { $regex: date, $options: "i" }; // Assumes date stored as string
  }

  if (Object.keys(searchCriteria).length === 0) {
    return res.status(400).json({ error: "No search parameters provided" });
  }

  const users = await Users.find(searchCriteria);

  return users;
}
