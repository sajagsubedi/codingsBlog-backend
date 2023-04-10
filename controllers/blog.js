const Blog = require("../models/Blog");
const { createCustomError } = require("../errors/Custom-error");

//-----CONTROLLER 1 : To  fetch  blogs   using GET '/api/notes/fetchallblogs'----
const fetchBlogs = async (req, res) => {
  const { category, query } = req.query;
  let queryObject = {};

  //adding category to queryObject if it exists
  if (category) {
    queryObject.category = category;
  }

  //adding search query to queryObject if it exists
  if (query) {
    queryObject.Title = {
      $regex: query,
      $options: "i",
    };
  }
  //finding blog as query object
  let result = Blog.find(queryObject);

  //getting total results
let TotalResults=await Blog.count(queryObject)

  //getting the required parameters=page,pageSize
  let page = Number(req.query.page) || 1;
  let pageSize = Number(req.query.pagesize) || TotalResults;

  //calculating the value to be skipped for fetching blogs according to page
  let skipValue = (page - 1) * pageSize;

  //sorting the blog
  result = result.sort("-publishedAt").skip(skipValue).limit(pageSize);
  let Blogs = await result;
  res.json({
    success: true,
    TotalResults,
    msg: "Blog fetched successfully!",
    category: category,
    page: page,
    blogs: Blogs,
  });
};

//-----CONTROLLER 2 : To  add a blog  using POST '/api/notes/addblog'---------
const addBlog = async (req, res) => {
  //finding blog to check whether the blog already exists or not
  let data = await Blog.find({
    Title: req.body.Title,
    Description: req.body.Description,
  });
  //checking whether the blog already exists or not
  if (data.length !== 0) {
    res.json({
      success: false,
      msg: "The blog you are trying to add already exists",
      blogs: data,
    });
  }
  //adding add request in db to add blog
  let newPost = new Blog(req.body);
  await newPost.save();
  let newData = await Blog.find(req.body);
  res.json({
    success: "true",
    msg: "Blog added succesfully",
    blog: newData,
  });
};

//-----CONTROLLER 3 : To  update a  blog corresponding to id provide  using PUT '/api/notes/updateblog/:id'----

const updateBlog = async (req, res) => {
  //getting id from params
  const { id: BlogId } = req.params;

  //finding the blog corresponding to the id and updating it
  const newBlog = await Blog.findOneAndUpdate(
    {
      _id: BlogId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  //throwing error if blog doesn't exists
  if (!newBlog) {
    createCustomError("Blog does'nt exists with the given id", 401);
  }
  //sending the updated blog as response
  res.json({ succes: true, msg: "Updated Blog Successfully", blog: newBlog });
};

//-----CONTROLLER 4 : To  delete a  blog corresponding to id provide  using DELETE '/api/notes/deleteblog/:id'----------

const deleteBlog = async (req, res) => {
  //getting id from params
  const { id: BlogId } = req.params;

  //finding the blog corresponding to the id and deleting it
  const newBlog = await Blog.findOneAndDelete({
    _id: BlogId,
  });
  //sending response msg
  res.json({
    success: "true",
    msg: "Blog Deleted Successfully",
  });
};

//exports of all the controllers
module.exports = {
  fetchBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
};
