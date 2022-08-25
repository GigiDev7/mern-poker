exports.errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    let message;
    if (err.keyPattern["username"]) {
      message = "Username exists";
    } else {
      message = "Email exists";
    }
    res.status(400).json({ message });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "Authentication Error") {
    res.status(403).json({ message: err.message });
  } else if (err.name === "No Table") {
    res.status(404).json({ message: err.message });
  } else {
    res.status(500).json(err);
  }
};
