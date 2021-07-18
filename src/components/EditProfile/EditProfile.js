import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import isEmpty from "../../validation/is-empty";
import { createProfile } from "../../actions/profileActions";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";

function CreateProfile() {
  const [profileData, setProfileData] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {},
  });

  const { errors, displaySocialInputs } = profileData;
  const dipatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.errors) {
      setProfileData({ ...profileData, errors: state.errors });
    }
  }, [state.errors]);
  useEffect(() => {
    if (state.profile.profile) {
      const profile = state.profile.profile;
      console.log(profile);

      const skillsCSV = profile.skills.join(",");

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // set componenets field state
      setProfileData({
        ...profileData,
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      });
    }
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    dipatch(createProfile(profileData, history));
  };
  const onChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  let socialInputs;
  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter profile url"
          name="twitter"
          icon="fab fa-twitter"
          value={profileData.twitter}
          onChange={onChange}
          error={errors.twitter}
        />
        <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          value={profileData.facebook}
          onChange={onChange}
          error={errors.facebook}
        />

        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={profileData.linkedin}
          onChange={onChange}
          error={errors.linkedin}
        />

        <InputGroup
          placeholder="YouTube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={profileData.youtube}
          onChange={onChange}
          error={errors.youtube}
        />

        <InputGroup
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram"
          value={profileData.instagram}
          onChange={onChange}
          error={errors.instagram}
        />
      </div>
    );
  }
  // Select options for status
  const options = [
    { label: "* Select Professional Status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit your profile</h1>

            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={profileData.handle}
                onChange={onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={profileData.status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={profileData.company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={profileData.website}
                onChange={onChange}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={profileData.location}
                onChange={onChange}
                error={errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={profileData.skills}
                onChange={onChange}
                error={errors.skills}
                info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={profileData.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={profileData.bio}
                onChange={onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() =>
                    setProfileData({
                      ...profileData,
                      displaySocialInputs: !profileData.displaySocialInputs,
                    })
                  }
                  className="btn btn-lignt"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
