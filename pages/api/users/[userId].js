import { getUser, putUser, deleteUser } from "../../../database/controller";
import { apiMiddleware } from "../../../lib/api-middleware";
import { HttpError } from "../../../lib/http-error";

export default apiMiddleware(async function handler(req, res) {
  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      return getUser(req, res);
    case "PUT":
      return putUser(req, res);
    case "DELETE":
      return deleteUser(req, res);
    default:
      throw new HttpError(405, "Method not allowed");
  }
});
