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
      return await getUsers(req, res);
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
