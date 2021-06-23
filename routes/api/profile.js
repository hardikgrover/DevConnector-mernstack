const express = require("express");
const passport = require("passport");
const router = express.Router();
const mongoose = require("mongoose");
// load validation
const validateProfileInput = require("../../validation/profile");

const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// load profile model
const Profile = require("../../models/Profile");

//load user model
const User = require("../../models/Users");
const { route } = require("./users");

// Profile.deleteMany({ handle: "hardik" });

// @route GET api/profile/test
// @desc Tests profiele route
// @access public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// @route GET api/profile
// @desc get current user's profile
// @access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((e) => res.status(404).json(e));
  }
);
// @route GEt api/profile/all
// @desc Get all profiles
// @access public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "there are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => res.status(404).json({ profile: "there is no profiles" }));
});

// @route GEt api/profile/handle/:handle
// @desc Get profile by handle;
// @access public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

// @route GEt api/profile/user/:user_id
// @desc Get profile by id;
// @access public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: "there is no profile for this user" })
    );
});
// @route POST api/profile
// @desc Create or update user's profile
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.user);
    const { errors, isValid } = validateProfileInput(req.body);
    //   check validation
    if (!isValid) {
      // return any errors
      console.log("is valid not passed");
      return res.status(400).json(errors);
    }
    // // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    // console.log("user id", req.user.id);
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    // if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // // skills - split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // // social
    // profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //   create
        // check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "Handle already exists";
            res.status(400).json(errors);
          }
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

// @route Post api/profile/experience
// @desc Add experience to profile
// @access private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);
    const { errors, isValid } = validateExperienceInput(req.body);
    //   check validation
    if (!isValid) {
      // return any errors
      console.log("is valid not passed");
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // add to experience array
      profile.experience.unshift(newExp);

      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  }
);

// @route Post api/profile/education
// @desc Add education to profile
// @access private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);
    const { errors, isValid } = validateEducationInput(req.body);
    //   check validation
    if (!isValid) {
      // return any errors
      console.log("is valid not passed");
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // add to experience array
      profile.education.unshift(newEdu);

      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  }
);
// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // get remove index

        const removeIndex = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.exp_id);

        // splice out of array
        profile.experience.splice(removeIndex, 1);
        // sava
        profile.save().then((profile) => res.json(profile));
      })
      .catch((e) => res.status(404).json(e));
  }
);

// @route DELETE /api/profile/education:edu_id
// @desc Delete education from profile
// @access private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const removeIndex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        profile.save().then((profile) => res.json(profile));
      })
      .catch((e) => res.status(404).json(e));
  }
);

// @route DELETE /api/profile/
// @desc Delete user and profile
// @access private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
