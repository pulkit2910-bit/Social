import React, { useContext } from "react";
import "./ProfileCard.css";
import Cover from "../../../img/cover.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const ProfileCard = ({ profile }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img className={profile ? "profile-cover" : "home-cover"} src={user.coverPicture.url ? user.coverPicture.url : Cover} alt="" />
        <img src={user.avatar.url} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.name}</span>
        <span>{user.username}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
        </div>
        <hr />
      </div>

    </div>
  );
};

export default ProfileCard;
