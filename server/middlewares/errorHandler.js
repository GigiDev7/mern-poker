exports.errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(400).json(err);
  } else if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "Authentication Error") {
    res.status(403).json({ message: err.message });
  } else {
    res.status(500).json(err);
  }
};
