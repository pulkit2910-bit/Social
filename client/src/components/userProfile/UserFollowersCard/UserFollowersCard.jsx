import React, { useState, useEffect } from "react";
import "../../home/FollowersCard/FollowersCard.css";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserFollowersCard = ({user}) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getFollowers = async () => {
      const res = await Promise.all(
        user.followers?.map((f) => {
          return axios.get(`/users?userID=${f}`);
        })
      );
      setFollowers(res);
      setLoading(false);
    };
    getFollowers();

  }, [user]);

  if (loading) {
    return (
      <SkeletonTheme
        baseColor="rgba(251, 251, 251, 0.33)"
        highlightColor="rgba(83, 84, 84, 0.33)"
      >
        <div>
          <Skeleton height={100} />
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="FollowersCard">
      <h3>Followers</h3>
      {followers &&
        followers.map((f, k) => {
          return (
            <div className="follower" key={k}>
              <div>
                <img src={f.data.avatar.url} alt="" className="followerImg" />
                <div className="followerName">
                  <span>{f.data.name}</span>
                  <span>{f.data.username}</span>
                </div>
              </div>

              {/* follow/unfollow button */}
              
            </div>
          );
        })}
    </div>
  );
};

export default UserFollowersCard;
