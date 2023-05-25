import React from 'react'
import './LeftSide.css'

import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import FollowersCard from '../FollowersCard/FollowersCard'

const LeftSide = () => {
  return (
    <div className='LeftSide'>
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  )
}

export default LeftSide
