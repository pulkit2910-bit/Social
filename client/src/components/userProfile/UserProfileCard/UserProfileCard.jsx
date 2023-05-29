import React, { useContext, useState } from "react";
import "../../home/ProfileCard/ProfileCard.css";
import "./UserProfileCard.css"
import Cover from "../../../img/cover.jpg";
import { AuthContext } from "../../../Context/AuthContext/AuthContext"
import { followUser, unfollowUser } from "../../../apiCalls";

const UserProfileCard = ({ user }) => {
  const {user : currentUser, dispatch} = useContext(AuthContext);
  const [isFollowing, setIsfollowing] = useState(user.followers.includes(currentUser._id));
  const [no_followers, set_no_followers] = useState(user.followers.length);
  // console.log(currentUser)

  const followHandler = async () => {
    set_no_followers(no_followers+1);
    setIsfollowing(true);
    followUser(currentUser, user, dispatch);
  }
  
  const unfollowHandler = async () => {
    set_no_followers(no_followers-1);
    setIsfollowing(false);
    unfollowUser(currentUser, user, dispatch)
  }

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img className="user-cover" src={user.coverPicture.url ? user.coverPicture.url : Cover} alt="" />
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
            <span>{no_followers}</span>
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

      {!isFollowing && 
        <button className="follow-btn" onClick={followHandler}>
          Follow
        </button>
      }

      {isFollowing &&
        <button className="following-btn" onClick={unfollowHandler}>
          Following
        </button>
      }

    </div>
  );
};

export default UserProfileCard;
