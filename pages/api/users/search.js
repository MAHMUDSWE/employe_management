import { searchUsers } from "../../../database/controller";
import { apiMiddleware } from "../../../lib/api-middleware";

export default apiMiddleware((req, res) => {
  return searchUsers(req, res);
});
