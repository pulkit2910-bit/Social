import React from 'react'
import "../../profile/ProfileLeft/ProfileLeft.css"
import LogoSearch from '../../home/LogoSearch/LogoSearch'
import InfoCard from '../../profile/InfoCard/InfoCard'
import UserFollowersCard from '../UserFollowersCard/UserFollowersCard'

const UserProfileLeft = ({ user }) => {
  return (
    <div className='ProfileLeft'>
      <LogoSearch />
      <InfoCard />
      <UserFollowersCard user={user} />
    </div>
  )
}

export default UserProfileLeft
