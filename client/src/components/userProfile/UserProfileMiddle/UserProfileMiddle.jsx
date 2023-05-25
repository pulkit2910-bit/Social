import React from 'react'
import "../../profile/ProfileMiddle/ProfileMiddle.css"
import UserPosts from '../UserPosts/UserPosts'

const UserProfileMiddle = ({ user }) => {
  return (
    <div className='ProfileMiddle'>
      <UserPosts user={user} />
    </div>
  )
}

export default UserProfileMiddle
