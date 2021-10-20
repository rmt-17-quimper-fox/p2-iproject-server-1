const errorHandler = (err, req, res, next) => {
  console.log(err.name);

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      const message = err.errors.map((el) => {
        return el.message;
      });
      res.status(400).json({ message });
      break;
      case "JsonWebTokenError":
      res.status(400).json({ message: "You must Log In first!" });
      break;
      case "Forbidden":
      res.status(401).json({ message: "Forbidden Access" });
      break;
      case "LoginFailed":
      res.status(401).json({ message: "Invalid Email/Password" });
      break;
      case 'bad request':
        res.status(400).json({ message: "Id Not found" });
        break;
      case "NotFound":
        res.status(404).json({ message: "Products Id Not found" });
        break;
        case "Unauthorized":
          res.status(403).json({ message: "only Admin can access" });
          break;

    default:
      res.status(500).json({ message: "internal server error" });
      break;
  }
};
module.exports = errorHandler
