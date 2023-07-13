import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import TimeAgo from 'react-timeago'
import Like from "../../../img/like.png";
import NotLike from "../../../img/notlike.png";
import Comment from "../../../img/comment.png";
import Share from "../../../img/share.png";
import { GoKebabVertical } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { FeedContext } from "../../../Context/FeedContext/FeedContext";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { deletePost } from "../../../apiCalls";

const DropdownItem = ({ item, postID }) => {
  const {posts, dispatch} = useContext(FeedContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (item.id === 0) {
      // edit post
    } else if (item.id === 1) {
      // delete post
      deletePost(posts, postID, dispatch);
    }
  };

  return (
    <li className="dropdownItem" onClick={(e) => handleClick(e)}>
      <p>
        {item.icon}
        {item.label}
      </p>
    </li>
  );
};

const Post = ({ post, profile }) => {
  // console.log(post)
  const { user: currentUser } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const options = [
    { label: "Edit Post", icon: <CiEdit />, id: 0 },
    { label: "Delete Post", icon: <MdDelete />, id: 1 },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userID=${post.userID}`);
      setUser(res.data);
      setIsLiked(post.likes.includes(currentUser._id));
      setLoading(false);
    };
    fetchUser();
    // console.log(user);
  }, [currentUser._id, post]);

  const likeHandler = async () => {
    try {
      await axios.put(`/posts/like/${post._id}`);
    } catch (err) {}
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

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
    <div className="Post">
      {user && (
        <>
          <div className="postHeader">
            <img src={user.avatar.url} alt="" />
            <span>
              <b>{user.name}</b>
            </span>
            {profile && (
              <div className="menu" onClick={() => setOpen(!open)}>
                <GoKebabVertical />
                <div className={`postDropdown ${open ? "active" : "inactive"}`}>
                  <ul>
                    {options.map((item, key) => {
                      return <DropdownItem item={item} postID={post._id} key={key} />;
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <hr />

          {/* Add white bg div */}

          <img src={post.img.url} alt="" />

          <hr />

          <div className="postReact">
            <img onClick={likeHandler} src={isLiked ? Like : NotLike} alt="" />
            <Link to={`/post/${post._id}`}>
              <img src={Comment} alt="" />
            </Link>
            <img src={Share} alt="" />
          </div>

          <span className="likes">{likes} likes</span>

          <div className="details">
            <span>{user.name}</span>
            <span> {post.desc}</span>
          </div>
          <div className="postBottom">
            <TimeAgo date={post.createdAt} />
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
