import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import logger from '../utils/logger.js';

export const verifyAuth = async (req, res, next) => {
  logger.info('verifyAuth middleware invoked');
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error("Error in verifyAuth middleware:", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};
