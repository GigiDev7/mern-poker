module.exports = class CustomError {
  constructor(name, message) {
    this.message = message;
    this.name = name;
  }
};
