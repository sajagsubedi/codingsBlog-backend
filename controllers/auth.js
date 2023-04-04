const User = require("../models/User");
const JWT = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;
const bcrypt = require("bcryptjs");

//_____________CONTROLLERS______________

//-----CONTROLLER 1 : To  login   using POST '/api/auth/login'----
const login = async (req, res) => {
  //Getting the required parameters from request body
  let type = "user";
  const { email, password } = req.body;
  let searchParam = {
    email: email,
  };
  const user = await User.findOne(searchParam);
  type = user.type;

  //checking whether the user with the given email exists or not
  if (!user) {
    return res
      .status(404)
      .json({ succes: false, msg: "Please enter correct credentials" });
  }
  //comparing the password of the user and the given password by the request
  let passwordCompare = await bcrypt.compare(password, user.password);

  //checking whether the password matches or not
  if (!passwordCompare) {
    return res
      .status(404)
      .json({ succes: false, msg: "Please enter correct credentials" });
  }

  //initializing data for jwt
  const data = {
    user: {
      id: user._id,
    },
  };
  //signing data with JWT_Secret to generate authToken
  let authToken = JWT.sign(data, JWT_Secret);
  //sending authToken
  res.json({ type: type, success: true, authToken });
};

//-----CONTROLLER 2 : TO  CREATE A  user   USING POST '/api/auth/signup'----

const signup = async (req, res) => {
  //Getting the required parameters from request body
  const { name, email, password } = req.body;
  //checking whether the user already exists or not
  let user = await User.findOne({
    email: email,
  });
  //sending response if user already exists
  if (user) {
    return res.status(403).json({
      success: false,
      msg: "Sorry the user with the provided email already exists!",
    });
  }
  //generating salt for hashing
  let salt = await bcrypt.genSalt(10);
  let securePassword = await bcrypt.hash(password, salt); //generating a securePassword using bcrypt
  //creating a new user
  user = await User.create({
    name,
    email,
    password: securePassword,
    type: "user",
  });
  //initializing data for authToken
  const data = {
    user: {
      id: user._id,
    },
  };
  //signing the data with JWT_Secret to generate authToken
  let authToken = JWT.sign(securePassword, JWT_Secret);
  //sending the authToken as response
  res.json({
    type: "user",
    success: "true",
    msg: "New user created successfully",
    authToken,
  });
};

//-----CONTROLLER 3 : To  delete a  user  using DELELTE '/api/auth/deleteuser'----
const deleteUser = async (req, res) => {
  //Getting the required parameters from  req.user
  const { id } = req.user;

  //finding the user with the given id
  let user = await User.findOne({ _id: id });
  //checking whether the user exists or not and sending response corresponding to it
  if (!user) {
    return res.status(403).json({
      success: false,
      msg: "Sorry the user  doesn't exists",
    });
  }
  //deletion of user
  user = await User.findOneAndDelete({ _id: id });
  //sending the removed user as response
  res.json({
    succes: true,
    msg: "User deletd successfully",
    removedUser: user,
  });
};
//-----CONTROLLER 4 : To  fetch user  using GET '/api/auth/fetchuser'----
const fetchUser = async (req, res) => {
  const { id } = req.user;
  //finding the user corresponding to the id
  const user = await User.find({ _id: id });

  //sending json request
  return res.json({
    success: true,
    msg: "Fetched user data successfully",
    user,
  });
};

//exports of controller
module.exports = { login, signup, deleteUser, fetchUser };
