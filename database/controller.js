import { HttpError } from "../lib/http-error";
import Users from "../model/user";

export async function getUsers(req, res) {
  const {
    page = 1,
    size = 6,
    sort_by = "createdAt",
    order = 1,
    name,
    date,
    email,
    phone,
  } = req.query;
  const searchCriteria = {};
  if (name) {
    const regex = { $regex: name, $options: "i" };
    searchCriteria.$or = [
      {
        lastName: regex,
      },
      {
        firstName: regex,
      },
    ];
  }
  if (date) {
    searchCriteria.date = new Date(date);
  }
  if (email) {
    searchCriteria.email = { $regex: email, $options: "i" };
  }
  if (phone) {
    searchCriteria.phone = phone;
  }

  const users = await Users.find(searchCriteria)
    .sort({ [sort_by]: +order })
    .skip((page - 1) * size)
    .limit(size);

  const totalCount = await Users.find(searchCriteria).countDocuments();

  return {
    users,
    totalPage: Math.ceil(totalCount / size),
    isLastPage: totalCount <= page * size,
  };
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
  const { firstName, avatar, lastName, email, phone, date } =
    Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [key, value.trim()])
    );

  if (!firstName || !lastName || !avatar || !email || !phone || !date) {
    throw new HttpError(400, "Missing form data");
  }


  const existingUser = await Users.findOne({ email, phone });
  if (existingUser && existingUser.email === email) {
    throw new HttpError(409, "User with this email already exists");
  }
  else if (existingUser && existingUser.phone === phone) {
    throw new HttpError(409, "User with this phone number already exists");
  }

  const userData = { firstName, lastName, avatar, email, phone, date };

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
  const { name, email, phone, date } = req.body;

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
    searchCriteria.date = new Date(date); // Assumes date stored as string
  }

  const users = await Users.find(searchCriteria);

  return users;
}
