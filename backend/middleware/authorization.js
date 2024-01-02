const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  const token = req.cookies["cookietoken"];
  if (!token) return res.sendStatus(401);
  await jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


module.exports = {
  authorization
}