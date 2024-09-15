import connectMongo from "../database/conn";

export const apiMiddleware = (handler) => {
  return async (req, res) => {
    try {
      await connectMongo();
      const result = await handler(req);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(err?.status || 500).json({ message: err?.message });
    }
  };
};
