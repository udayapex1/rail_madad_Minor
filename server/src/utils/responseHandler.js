export const successResponse = (
  res,
  {
    status = 200,
    message = "Success",
    data = null,
    user = null,
    token = null,
  } = {},
) => {
  return res.status(status).json({
    success: true,
    message,
    ...(data && { data }),
    ...(user && { user }),
    ...(token && { token }),
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


export const createdResponse = (res, data, message = "Created successfully") => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const notFoundResponse = (res, message = "Not found") => {
  return res.status(404).json({
    success: false,
    message,
  });
};

export const unauthorizedResponse = (res, message = "Unauthorized") => {
  return res.status(401).json({
    success: false,
    message,
  });
};

export const forbiddenResponse = (res, message = "Access denied") => {
  return res.status(403).json({
    success: false,
    message,
  });
};

export const validationError = (res, message = "Validation failed") => {
  return res.status(400).json({
    success: false,
    message,
  });
};