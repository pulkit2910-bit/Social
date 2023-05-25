import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from "../../components/Loading/Loading"
import UserProfileLeft from '../../components/userProfile/UserProfileLeft/UserProfileLeft'
import UserProfileMiddle from '../../components/userProfile/UserProfileMiddle/UserProfileMiddle'
import UserProfileRight from '../../components/userProfile/UserProfileRight/UserProfileRight'

const UserProfile = () => {
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users?userID=${userID}`);
      setUser(res.data);
      setLoading(false);
    }
    getUser();
  }, [userID]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className='Profile'>
      <UserProfileLeft user={user} />
      <UserProfileMiddle user={user} />
      <UserProfileRight user={user} />
    </div>
  )
}

export default UserProfile
