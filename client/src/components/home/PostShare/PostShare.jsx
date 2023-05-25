import React, { useState, useRef, useContext } from "react";
import "./PostShare.css";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { FeedContext } from "../../../Context/FeedContext/FeedContext";
import { createPost } from "../../../apiCalls";

//icons
import { HiOutlinePhoto } from "react-icons/hi2";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const PostShare = () => {
  const [imagePath, setImagePath] = useState(null);
  const [img, setImg] = useState(null);
  const imgRef = useRef();
  const desc = useRef();

  const { posts, dispatch } = useContext(FeedContext);

  const { user } = useContext(AuthContext);
  const firstname = user.name.split(" ")[0];

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setImg(image);
      // console.log(image);
      const imgUrl = URL.createObjectURL(image);
      setImagePath(imgUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("desc", desc.current.value);
    formData.append("post", img);

    createPost(posts, formData, dispatch);
    setImagePath(null)
  };

  return (
    <div className="PostShare">
      <img src={user.avatar.url} alt="" />
      <form className="post-share-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`What's in your mind ${firstname} ?`}
          ref={desc}
        />
        <div className="postOptions">
          <div>
            <div
              className="options"
              style={{ color: "var(--location)" }}
              onClick={() => imgRef.current.click()}
            >
              <HiOutlinePhoto />
              <span>Photo</span>
            </div>
            <div className="options" style={{ color: "var(--shedule)" }}>
              <AiOutlinePlayCircle />
              <span>Video</span>
            </div>
            <div className="options" style={{ color: "var(--video)" }}>
              <IoLocationOutline />
              <span>Location</span>
            </div>
            <div className="options" style={{ color: "var(--photo)" }}>
              <BsEmojiSmile />
              <span>Feelings</span>
            </div>
          </div>
          <button className="button share-btn" type="submit">
            Share
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              ref={imgRef}
              name="post"
              onChange={handleChange}
            />
          </div>
        </div>

        {imagePath && (
          <div className="previewImg">
            <img src={imagePath} alt="" />
            <RxCross2 onClick={() => setImagePath(null)} />
          </div>
        )}
      </form>
    </div>
  );
};

export default PostShare;
