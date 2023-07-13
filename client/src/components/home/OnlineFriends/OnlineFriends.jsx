import React, { useContext, useEffect, useState } from "react";
import "./OnlineFriends.css";

import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const OnlineFriends = () => {
  const { user: currentUser, socket } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineUsersID, setOnlineUsersID] = useState([]);
  let friends = currentUser.following;

  // connecting to socket and adding current user to socket server
  useEffect(() => {
    socket.emit("addUser", currentUser._id);
  }, [currentUser, socket]);

  // getting all online users connected to socket server and filtering online friends of current user
  useEffect(() => {
    socket.on("getUsers", (users) => {
      const usersID = users.filter((user) => friends.includes(user.userID));
      setOnlineUsersID(usersID);
    });
  }, [socket, friends]);

  // getting data of online friends
  useEffect(() => {
    const getOnlineFollowingUsers = async () => {
      const res = await Promise.all(
        onlineUsersID?.map((user) => {
          return axios.get(`/users?userID=${user.userID}`);
        })
      )
      setOnlineUsers(res);
      setLoading(false);
    }
    getOnlineFollowingUsers();
  }, [onlineUsersID])

  if (loading && onlineUsers) {
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
    <div className="onlineFriends">
      <h2>Online Friends</h2>
      {onlineUsers.length === 0 && 
        <div className="no-online-users">
          No online users
        </div>
      }
      {onlineUsers?.map((user, key) => {
        return (
          <div className="follower" key={key}>
            <div>
              <img src={user.data.avatar.url} alt="" className="followerImg" />
              <div className="followerName">
                <span>{user.data.name}</span>
                <span>{user.data.username}</span>
              </div>
            </div>
            <button className="button msg-btn">
              <Link to={"/inbox"}>
                Message
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default OnlineFriends;
