import React, { useEffect, useContext } from "react";
import "./FeedSection.css";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { FeedContext } from "../../../Context/FeedContext/FeedContext";
import { profilePosts, userFeed } from "../../../apiCalls";
import Posts from "../Posts/Posts";

const FeedSection = ({ profile }) => {
  const { user  } = useContext(AuthContext);
  const { dispatch } = useContext(FeedContext);

  useEffect(() => {
    const fetchPosts = async () => {
      profile ? profilePosts(user._id, dispatch) : userFeed(user._id, dispatch); 
    };
    fetchPosts();
  }, [user, profile, dispatch]);

  return (
    <div className="FeedSection">
      <Posts/>
    </div>
  );
};

export default FeedSection;
