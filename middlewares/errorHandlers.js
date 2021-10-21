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
      res.status(401).json({ message: "You must Log In first!" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "Forbidden Access" });
      break;
    case "LoginFailed":
      res.status(401).json({ message: "Invalid Email/Password" });
      break;
    case "bad request":
      res.status(400).json({ message: "Id Not found" });
      break;
    case "NotFound":
      res.status(404).json({ message: "Products Id Not found" });
      break;
    case "Unauthorized":
      res.status(403).json({ message: "only Admin can access" });
      break;
    case "ProductNotFound":
      res.status(404).json({ message: "Product Not Found" });
      break;
    case "cart NotFound":
      res.status(404).json({ message: "Cart Not Found" });
      break;
    case "CartNotFound":
      res.status(404).json({ message: "Cart NotFound" });
      break;
    case "CustUnauthorized":
      res.status(403).json({ message: "can't access" });
      break;
    case "AdmintUnauthorized":
      res.status(403).json({ message: "Forbidden Access" });
      break;
    default:
      res.status(500).json({ message: "internal server error" });
      break;
  }
};
module.exports = errorHandler;
