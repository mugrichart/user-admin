import React from 'react';
import "./Welcome.css";
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="welcome">
        <h1>Welcome Admin</h1>
        <div>
            <Link to="new-user" className='btn'>Create a New User</Link>
            <Link to="users" className='btn'>Manage Users</Link>
        </div>
    </div>
  )
}

export default Welcome