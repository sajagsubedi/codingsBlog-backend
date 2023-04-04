const express = require("express");
const router = express.Router();
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/comment");
const checkUser = require("../middlewares/checkUser");

//-------ROUTES FOR CRUD OF COMMENTS-------

//Route:1
router.route("/getcomments/:id").get(getComments);
//Route:2
router.route("/add/:id").post(checkUser, addComment);
//Route:3
router.route("/delete/:id").delete(checkUser, deleteComment);

//export of Router
module.exports = router;
