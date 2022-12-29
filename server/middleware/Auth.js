import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied!");
    } else {
      token = req.header("Authorization").split(" ")[1];
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
