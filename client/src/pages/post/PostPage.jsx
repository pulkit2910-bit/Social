import React, { useContext, useEffect, useRef, useState } from "react";
import "./PostPage.css";
import { useParams } from "react-router-dom";
import Like from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Emoji from "../../img/emoji.png";
import axios from "axios";
import { addComment } from "../../apiCalls";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Loading from "../../components/Loading/Loading";

const PostPage = () => {
  const {user : currentUser} = useContext(AuthContext);

  const { postID } = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); 
  const comment = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior : "smooth", block : "end"});
  }, [comments]);

  useEffect(() => {

    const getData = async () => {
      axios.get(`/posts/post?postID=${postID}`)
      .then(res => res.data)
      .then(async (res) => {
        setPost(res);
        setIsLiked(res.likes.includes(currentUser._id));
        setLikes(res.likes.length);
        setComments(res.comments);

        axios.get(`/users?userID=${res.userID}`)
        .then(d => d.data)
        .then((d) => {
          setUser(d);
          setLoading(false);
        })
      })
    }

    getData();

  }, [postID, currentUser]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/like/${post._id}`);
    } catch (err) {}
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const postComment = async (e) => {
    e.preventDefault();
    const newComment = {
      userID : currentUser._id,
      content : comment.current.value
    }
    const res = await addComment(postID, newComment);
    // console.log(res);
    comment.current.value = "";
    setComments((prevComments) => ([...prevComments, res]));
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="PostPage">
      <div className="post">
        <img src={post.img.url} alt="" />

        <div className="postInfo">
          <div className="postHeader">
            <img src={user.avatar.url} alt="" />
            <span>
              <b>{user.name}</b>
            </span>
          </div>
          <hr />
          <div className="postComments" ref={scrollRef}>
            {post.desc && 
              (
                <div className="postDesc">
                  <img src={user.avatar.url} alt="" />
                  <div>{post.desc}</div>
                </div>
              )
            }
            {comments?.map((c, id) => {
              return (
                <div className="comments" key={id}>
                  <div className="commentHeader">
                    <img src={c.avatar.url} alt="" />
                    <span><b>{c.name}</b></span>
                  </div>
                  <div className="commentContent">
                    {c.content}
                  </div>
                </div>
              )
            })}
          </div>
          <hr />
          <div className="postReact">
            <img onClick={likeHandler} src={isLiked ? Like : NotLike} alt="" />
            <img onClick={() => comment.current.focus()} src={Comment} alt="" />
            <img src={Share} alt="" />
          </div>
          <span className="likes">{likes} likes</span>
          <hr />
          <form className="addComment" onSubmit={postComment}>
            <img src={Emoji} alt="" />
            <input type="text" placeholder="Add Comment" required ref={comment} />
            <button type="submit" className="button">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
