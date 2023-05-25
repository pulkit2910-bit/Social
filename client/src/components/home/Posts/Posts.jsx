import React, { useContext } from 'react'
import Post from '../Post/Post';
import "./Posts.css"
import { FeedContext } from '../../../Context/FeedContext/FeedContext';
import PostShare from "../PostShare/PostShare";
import ProfileCard from '../ProfileCard/ProfileCard';
import { useLocation } from 'react-router-dom';

const Posts = () => {
  const location = useLocation();
  const isProfile = location.pathname === "/profile";
  const { posts } = useContext(FeedContext);

  return (
    <div className='Posts'>
      {!isProfile && <PostShare />}
      {isProfile && <ProfileCard profile={isProfile} />}
      {posts && 
        posts.map((p, k) => {
          return <Post post={p} key={k} profile={isProfile} />
        })
      }
    </div>
  )
}

export default Posts
