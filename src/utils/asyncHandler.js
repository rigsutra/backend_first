const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

//This is another method to execute the same code using the try catch method

// const asyncHandler = () => {};
// const asyncHandler = (fun ) => {() =>{}}
// const asyncHandler = (fun) => async() => {}

// const asyncHandler = (fun) => async (req , res , next) => {
//     try {
//         await fun(req , res , next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false ,
//              message: error.message})

//     }
//   }
