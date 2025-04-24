export const authorization = (role) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "No user found. Please login." });
    }

    if (user.role !== role) {
      return res
        .status(403)
        .json({ message: "Access denied! Only for " + role });
    }

    next();
  };
};
