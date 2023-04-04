const JWT = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;
const User = require("../models/User");

const checkAdmin = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "Please enter authorization token" });
  }
  try {
    const decodedUser = JWT.verify(token, JWT_Secret);
    const foundAdmin = await User.findOne({
      _id: decodedUser.user.id,
      type: "admin",
    });
    if (!foundAdmin) {
      return res.json({ success: false, msg: "Request denied!" });
    }
    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = checkAdmin;
