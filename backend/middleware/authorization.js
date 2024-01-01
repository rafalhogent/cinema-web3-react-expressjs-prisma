const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const cookieToken = req.cookies["cookietoken"];
  const token = cookieToken;
  if (!token) return res.sendStatus(401);
  await jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};