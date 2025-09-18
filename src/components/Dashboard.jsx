import React from 'react'
import { useUserAuth } from '../context/userAuthContext'

const Dashboard = () => {

    const {logout} = useUserAuth()

  return (
    <div>Dashboard
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard