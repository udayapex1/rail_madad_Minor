export const successResponse = (
  res,
  {
    status = 200,
    message = "Success",
    data = null,
    user = null,
    token = null
  } = {}
) => {
  return res.status(status).json({
    success: true,
    message,
    ...(data && { data }),
    ...(user && { user }),
    ...(token && { token })
  });
};

export const errorResponse = (
  res,
  message = "Something went wrong",
  status = 500,
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
