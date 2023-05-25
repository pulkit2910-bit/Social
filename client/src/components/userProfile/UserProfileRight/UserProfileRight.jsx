import React, { useEffect, useState } from "react";
import "../../profile/ProfileRight/ProfileRight.css";
import NavIcons from "../../home/NavIcons/NavIcons";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfileRight = ({ user }) => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFollowers = async () => {
      const res = await Promise.all(
        user.following?.map((f) => {
          return axios.get(`/users?userID=${f}`);
        })
      );
      setFollowingUsers(res);
      setLoading(false);
    };
    getFollowers();
  }, [user.following]);

  return (
    <div className="ProfileRight">
      <NavIcons />

      <div className="onlineFriends">
        <h2>Following</h2>

        {loading && (
          <SkeletonTheme
            baseColor="rgba(251, 251, 251, 0.33)"
            highlightColor="rgba(83, 84, 84, 0.33)"
          >
            <div>
              <Skeleton height={100} />
            </div>
          </SkeletonTheme>
        )}

        {!loading &&
          followingUsers.map((f, k) => {
            return (
              <div className="follower" key={k}>
                <div>
                  <img src={f.data.avatar.url} alt="" className="followerImg" />
                  <div className="followerName">
                    <span>{f.data.name}</span>
                    <span>{f.data.username}</span>
                  </div>
                </div>
                <button className="button msg-btn">Message</button>
              </div>
            );
          })}

        <button className="button r-btn">Show More</button>
      </div>
    </div>
  );
};

export default UserProfileRight;
