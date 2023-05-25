import React from 'react'
import "./OnlineFriends.css"

//images
import img1 from '../../../img/img1.png'
import img2 from '../../../img/img2.png'
import img3 from '../../../img/img3.png'
import img4 from '../../../img/img4.jpg'

const OnlineFriends = () => {
  return (
    <div className="onlineFriends">
        <h2>Online Friends</h2>
        <div className="follower">
          <div>
            <img src={img1} alt="" className='followerImg' />
            <div className="followerName">
              <span>name</span>
              <span>@username</span>
            </div>
          </div>
          <button className='button msg-btn'>
            Message
          </button>
        </div>

        <div className="follower">
          <div>
            <img src={img2} alt="" className='followerImg' />
            <div className="followerName">
              <span>name2</span>
              <span>@username2</span>
            </div>
          </div>
          <button className='button msg-btn'>
            Message
          </button>
        </div>

        <div className="follower">
          <div>
            <img src={img3} alt="" className='followerImg' />
            <div className="followerName">
              <span>name3</span>
              <span>@username3</span>
            </div>
          </div>
          <button className='button msg-btn'>
            Message
          </button>
        </div>

        <div className="follower">
          <div>
            <img src={img4} alt="" className='followerImg' />
            <div className="followerName">
              <span>name4</span>
              <span>@username4</span>
            </div>
          </div>
          <button className='button msg-btn'>
            Message
          </button>
        </div>
      </div>
  )
}

export default OnlineFriends
