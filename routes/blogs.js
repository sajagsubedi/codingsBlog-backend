const express = require("express");
const checkAdmin = require("../middlewares/checkAdmin");
const router = express.Router();
const {
  fetchBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  fetchSingleblog
} = require("../controllers/blog.js");

//-------ROUTES FOR CRUD OF Blogs--------
//Route:1
router.route("/fetchallblogs").get(fetchBlogs);
//Route:2
router.route("/addblog").post(checkAdmin, addBlog);
//Route:3
router.route("/updateblog/:id").put(checkAdmin, updateBlog);
//Route:4
router.route("/deleteblog/:id").delete(checkAdmin, deleteBlog);
//Route:5
router.route("/blog/:id").get( fetchSingleblog);

//export of router
module.exports = router;
