const express = require("express");
const router = express.Router();
const { login, signup, deleteUser, fetchUser } = require("../controllers/auth");
const checkUser = require("../middlewares/checkUser");

//-------ROUTES FOR LOGIN, SIGNUP REMOVAl and FETCHING of USER--------

//Route no:1
router.route("/login").post(login);
//Route no:2
router.route("/signup").post(signup);
//Route no:3
router.route("/deleteuser").delete(checkUser, deleteUser);
//Route no:3
router.route("/fetchuser").get(checkUser, fetchUser);

//-----------EXPORT OF ROUTER------------
module.exports = router;
