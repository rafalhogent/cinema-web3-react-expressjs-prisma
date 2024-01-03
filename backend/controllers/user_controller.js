const prisma = require("../config/prisma_db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const userController = {
  login: async (req, res) => {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
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
      res.cookie("cookietoken", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600 * 1000 * 24,
        sameSite: "strict",
      });
      res.status(200).json({ email: user.email });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Login failed.");
    }
  },

  register: async (req, res) => {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }

      // password
      const newUser = req.body;
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      // insert user into db
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
      if (error.code === "P2002") res.status(409).send("Email already used");
      else res.status(500).send("Error while registration.");
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("cookietoken", { sameSite: "strict" }).end();
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Logout failed");
    }
  },

  info: async (req, res) => {
    res.json(req.user);
  },
};

function generateAccessToken(user) {
  const userCreds = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
  const accessToken = jwt.sign(userCreds, process.env.SECRET_TOKEN, {
    expiresIn: "24h",
  });
  return accessToken;
}

module.exports = { userController };
