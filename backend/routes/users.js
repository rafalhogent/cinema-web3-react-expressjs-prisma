const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const prisma = require("../config/prisma_db");
const authorization = require("../middleware/authorization");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* register */
router.post(
  "/register",
  [
    bodyParser.json(),
    check("password", "Password needs min 6 characters").isLength({ min: 6 }),
    check("email", "Email has to be valid").isEmail(),
  ],
  async (req, res) => {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }

      const newUser = req.body;
      // Hash the password
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      const user = await prisma.user.create({
        data: {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          password: hashedPassword,
        },
      });

      // token
      const token = generateAccessToken(user);
      res.cookie("cookietoken", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 10,
        sameSite: "strict",
      });
      res.status(200).json({ email: user.email });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error while registration.");
    }
  }
);

/* login */
router.post("/login", [bodyParser.json()], async (req, res) => {
  try {
    const credentials = req.body;

    // check user
    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
      },
    });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // check credentials
    const result = await bcrypt.compare(credentials.password, user.password);
    if (!result) return res.status(403).json({ msg: "Invalid Credentials" });

    // token
    const token = generateAccessToken(user);
    // res.json({ token });
    res.cookie("cookietoken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 10,
      sameSite: "strict",
    });
    res.status(200).json({ email: user.email });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Login failed.");
  }
});

/* logout */
router.delete("/logout", [authorization], async (req, res) => {
  try {
    res.clearCookie("cookietoken", { sameSite: "strict" }).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Logout failed");
  }
});

/* user info */
router.get("/info", [authorization], (req, res) => {
  res.json(req.user);
});

function generateAccessToken(user) {
  const userCreds = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
  const accessToken = jwt.sign(userCreds, process.env.SECRET_TOKEN, {
    expiresIn: "25m",
  });
  return accessToken;
}

module.exports = router;
