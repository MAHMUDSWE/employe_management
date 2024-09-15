import connectMongo from "../../../database/conn";
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  searchUsers,
} from "../../../database/controller";
import { apiMiddleware } from "../../../lib/api-middleware";
import { HttpError } from "../../../lib/http-error";

export default apiMiddleware(async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Check if query parameters are provided for searching
      const { name, email, phone, date } = req.query;

      if (name || email || phone || date) {
        // If any search query is provided, call the searchUsers function
        return await searchUsers(req, res);
      } else {
        // Otherwise, return all users
        return await getUsers(req, res);
      }

    case "POST":
      return postUser(req, res);
    case "PUT":
      return putUser(req, res);
    case "DELETE":
      return deleteUser(req, res);
    default:
      throw new HttpError(405, "Method not allowed");
  }
});

