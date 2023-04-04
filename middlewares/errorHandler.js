const errorHandler = (err, req, res, next)=> {
  res.status(500).json({
    msg: "Something error occurred! Please try again",
    error: err.message
  })

}

//exports
module.exports = errorHandler