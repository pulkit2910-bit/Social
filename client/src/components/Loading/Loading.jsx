import React from 'react'
import "./Loading.css"
import LoadingImg from "../../img/Loading.gif" 

const Loading = () => {
  return (
    <div className='Loading'>
      <img src={LoadingImg} alt="" />
    </div>
  )
}

export default Loading
