import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  try {
    const userToken = req.headers.authorization;

    if (!userToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const decoded = jwt.verify(userToken.replace("Bearer ", ""), JWT_SECRET);
    req.userId = decoded.id;
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
  next();
};

export default auth;
