const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "skills field is required";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isUrl(data.website)) {
      errors.website = "not a valid url";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isUrl(data.twitter)) {
      errors.twitter = "not a valid url";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isUrl(data.youtube)) {
      errors.youtube = "not a valid url";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isUrl(data.facebook)) {
      errors.facebook = "not a valid url";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isUrl(data.linkedin)) {
      errors.linkedin = "not a valid url";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isUrl(data.instagram)) {
      errors.instagram = "not a valid url";
    }
  }
  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
