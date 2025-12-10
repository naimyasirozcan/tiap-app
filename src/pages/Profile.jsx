import React, { useEffect, useState } from 'react'
import service from './services/config.services'
import Loading from './Loading'

function Profile() {
  const userInfoJSON = localStorage.getItem("loggedUserInfo")
  const userInfoParsed = JSON.parse(userInfoJSON)
  const [userInfo, setUserInfo] = useState(null) 

  useEffect(() => {
    service.get(`employees/${userInfoParsed._id}`)
    .then((res) => {
      setUserInfo(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  },[])

  if(!userInfo){
    return <Loading/>
  }

  return (
    <div className='p-5' >

      <h1>Name:</h1>
      <p>{userInfo.name}</p>
      <br />

      <h1>Company Mail:</h1>
      <p>{userInfo.email}</p>
      <br />
      
      <h1>Department</h1>
      <p>{userInfo.department}</p>
      <br />

    </div>
  )
}

export default Profile