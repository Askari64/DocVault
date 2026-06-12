export const createRateLimitHandler = (code, message) => (req, res) => {
  return res.status(429).json({
    status: "error",
    code,
    message,
  });
};
