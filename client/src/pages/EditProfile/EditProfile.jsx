import React, { useContext, useRef, useState } from "react";
import "./EditProfile.css";
import Cover from "../../img/cover.jpg";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { updateUser } from "../../apiCalls";
import Loading from "../../components/Loading/Loading"

const EditProfile = () => {
  const { user, dispatch, isFetching } = useContext(AuthContext);
  const name = useRef();
  const username = useRef();
  const email = useRef();
  const profilePicRef = useRef();
  const coverPicRef = useRef();
  const [coverPicDisplay, setCoverPicDisplay] = useState(false);
  const [profilePicDisplay, setProfilePicDisplay] = useState(false);
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [coverImgPath, setCoverImgPath] = useState(user.coverPicture.url ? user.coverPicture.url : Cover);
  const [profileImgPath, setProfileImgPath] = useState(user.avatar.url);

  const handleCoverPicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setCoverImg(img);
      const imgUrl = URL.createObjectURL(img);
      setCoverImgPath(imgUrl);
    }
  }

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setProfileImg(img);
      const imgUrl = URL.createObjectURL(img);
      setProfileImgPath(imgUrl);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cover-pic", coverImg);
    formData.append("profile-pic", profileImg);
    formData.append("name", name.current.value);
    formData.append("username", username.current.value);
    formData.append("email", email.current.value);
    
    updateUser(user, formData, dispatch);
  };

  if (isFetching) {
    return <Loading />
  }

  return (
    <div className="EditProfile">
      <div className="EditProfileCard">
        <div className="ProfileImages">
          <div onClick={() => coverPicRef.current.click()} onMouseOver={() => setCoverPicDisplay(true)} onMouseOut={() => setCoverPicDisplay(false)}>
            <img src={coverImgPath} alt="" />
            <div style={{display : `${coverPicDisplay ? "block" : "none"}`}} className="edit-cover-pic" >
              <h2>Change Cover photo</h2>
            </div>
          </div>
          <div onClick={() => profilePicRef.current.click()} onMouseOver={() => setProfilePicDisplay(true)} onMouseOut={() => setProfilePicDisplay(false)}>
            <img src={profileImgPath} alt="" />
            <div style={{display : `${profilePicDisplay ? "block" : "none"}`}} className="edit-profile-pic" >
            <h5>Change Profile photo</h5>
            </div>
          </div>

          <div style={{display : "none"}}>
            <input type="file" name="cover-pic" accept=".png,.jpg,.jpeg" ref={coverPicRef} onChange={handleCoverPicChange} />
            <input type="file" name="profile-pic" accept=".png,.jpg,.jpeg" ref={profilePicRef} onChange={handleProfilePicChange} />
          </div>
        </div>

        <form className="edit-profile" onSubmit={handleSubmit}>
          <div className="name">
            <label>Name</label>
            <input type="text" placeholder="Name" name="name" ref={name} />
          </div>
          <div className="username">
            <label>Username</label>
            <input type="text" placeholder="Username" name="username" ref={username} />
          </div>
          <div className="email">
            <label>Email</label>
            <input type="text" placeholder="Email" name="email" ref={email} />
          </div>

          <button className="button update-btn" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
