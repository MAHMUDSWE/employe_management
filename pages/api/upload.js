import { parseForm } from "../../lib/uploader";

export const config = {
  bodyParser: false,
};

export default async (req, res) => {
  try {
    const { files, fields } = await parseForm(req);
    //const image = files.image
    //  ? "/uploads/" + files.image?.newFilename
    //  : undefined;
    console.log(files);
    res.send("hi");
  } catch (err) {
    console.log(err);
    res.send("hi");
  }
};
