const Comment = require("../models/Comment.js");
const User = require("../models/User.js");

//------------CONTROLLERS--------------

//-----CONTROLLER 1 :to fetch comments
const getComments = async (req, res) => {
  //getting the required parameters from req.params
  const { id: blogId } = req.params;
  const comments = await Comment.find({ blogId });
  res.json({ success: true, comments: comments });
};

//-----CONTROLLER 2 : to add comment
const addComment = async (req, res) => {
  //getting the required parameters from req
  const { id: blogId } = req.params;
  const { id: userId } = req.user;
  const { description } = req.body;
  if(!description){
    throw new Error("Please Enter decription of the comment")
    return 
  }
  //getting the user to get its username
  let user = await User.findOne({ _id: userId });
  let username = user.name;
  //adding Comment
  let newComment = await Comment.create({ username, blogId, userId,description });
  res.json({
    success: true,
    msg: "Comment added successfully",
    Comment: newComment,
  });
};

//-----CONTROLLER 3:to delete comment
const deleteComment = async (req, res) => {
  //getting the required parameters from req
  const { id: commentId } = req.params;
  const { id: userId } = req.user;
  //deleting the comment corresponding to commentId and userId
  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
    userId,
  });
  if (!deletedComment) {
    throw new Error("Comment with the given id doesn't exists");
    return;
  }
  res.status(200).json({success:true,msg:"Comment deleted successfully"})
};
//exports of all controllers
module.exports = { getComments, addComment, deleteComment };
