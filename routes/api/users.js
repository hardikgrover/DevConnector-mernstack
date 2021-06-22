const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load inpout validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../models/Users");

// @route GET api/users/register
// @desc Regiser user
// @access public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "email already exists";
      //   errors.x = "hey there";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((e) => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc LoginUser/ Returning jwt token
// @access public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // find the user by email
  User.findOne({ email }).then((user) => {
    // check for user
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json({
        email: "errors",
      });
    }
    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // res.send("success");
        // user matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt payload

        // // signin tokens
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json({ password: errors });
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current user
// @access private

router.get(
  "/current",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
    // res.send("hey there");
  }
);

module.exports = router;
