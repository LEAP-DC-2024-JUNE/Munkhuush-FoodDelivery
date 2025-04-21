import jwt from "jsonwebtoken";
export const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = jwt.decode(authHeader);
  if (decoded.role !== "ADMIN") {
    return res.json({ message: "Acces denied!, Only for admin" });
  }

  next();
};
