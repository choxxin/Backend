const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));

    //This resolves the promise to run request handler function if error occcurs give it to the next
  };
};
export { asyncHandler };

//IIFEE FUNCTION
// const asyncHandler =()=>{}
// const asyncHandler=(func) =>() => {}
// const asyncHandler=(func) =>async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
