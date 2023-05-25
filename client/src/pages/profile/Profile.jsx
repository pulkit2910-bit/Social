import React from "react";
import ProfileLeft from "../../components/profile/ProfileLeft/ProfileLeft";
import ProfileMiddle from "../../components/profile/ProfileMiddle/ProfileMiddle";
import ProfileRight from "../../components/profile/ProfileRight/ProfileRight";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <ProfileMiddle />
      <ProfileRight  />
    </div>
  );
};

export default Profile;
