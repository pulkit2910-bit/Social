import React from 'react'
import './Home.css'
import FeedSection from '../../components/home/FeedSection/FeedSection'
import LeftSide from '../../components/home/LeftSide/LeftSide'
import RightSide from '../../components/home/RightSide/RightSide'

const Home = () => {
  return (
    <div className='Home'>
      <LeftSide />
      <FeedSection />
      <RightSide />
    </div>
  )
}

export default Home
