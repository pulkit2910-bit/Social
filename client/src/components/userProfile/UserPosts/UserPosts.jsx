import React, { useEffect, useContext } from "react";
import "./UserPosts.css"
import { FeedContext } from "../../../Context/FeedContext/FeedContext";
import { profilePosts } from "../../../apiCalls";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import Post from "../../home/Post/Post";

const UserPosts = ({ user }) => {
  const { posts, isFetching, dispatch } = useContext(FeedContext);

  useEffect(() => {
    const fetchPosts = async () => {
      profilePosts(user._id, dispatch);
    };
    fetchPosts();
  }, [user, dispatch]);

  if (isFetching) {
    return <div>Loading....</div>;
  }

  return (
    <div className="UserPosts">
      <UserProfileCard user={user} />
      {posts &&
        posts.map((p, k) => {
          return <Post post={p} key={k} />;
        })}
    </div>
  );
};

export default UserPosts;
