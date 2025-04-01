import jwt from "jsonwebtoken";
import secretKey from "../config/jwtConfig.js";

const authenticateToken = (req, res, next) => {
    console.log("secret Key in authMiddleware file: ", secretKey);
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid Token" });
    }
    req.user = user;
    next();
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log(error);
  }
};

export default authenticateToken;
