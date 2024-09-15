import { apiMiddleware } from "../../lib/api-middleware";
import { parseForm } from "../../lib/uploader";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiMiddleware(async (req, res) => {
  const { files } = await parseForm(req);
  const newFileName = files.image[0]?.newFilename;
  return { url: "/uploads/" + newFileName };
});
