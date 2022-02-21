const authenticate = (req, res, next) => {
  console.log(req.session.passport);
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("User is not authenticate");
  }
};

export { authenticate };
