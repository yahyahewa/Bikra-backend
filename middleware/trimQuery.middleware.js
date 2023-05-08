export const trimQueryMiddleware = (req, res, next) => {
  for (let key in req.query) {
    if (
      req.query[key] === "" ||
      req.query[key] === null ||
      req.query[key] === undefined ||
      req.query[key] === "undefined"
    ) {
      delete req.query[key];
    } else if (typeof req.query[key] === "object") {
      for (let nkey in req.query[key]) {
        if (req.query[key][nkey] === "" || req.query[key][nkey] === null) {
          delete req.query[key][nkey];
        }
      }
      if (Object.keys(req.query[key]).length === 0) {
        delete req.query[key];
      }
    }
  }
  next();
};
