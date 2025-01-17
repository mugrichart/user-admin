import React, { useState} from 'react'
import "./NewUser.css"
import { newUser } from '../api/new_user'
import { use } from 'react'

const permissions = {
    x: ['a', 'b', 'c'],
    y: ['d', 'e', 'f'],
    z: ['g', 'h', 'i']
}

const NewUser = () => {
    const [userData, setUserData] = useState({role: "x", permissions: permissions.x})
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        newUser(userData)
    }

  return (
    <div className='new-user'>
        <h1>New User</h1>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Username</label>
                <input type="text" id="name" value={userData.name} onChange={e => setUserData(prev => ({...prev, name: e.target.value}))}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={userData.email} onChange={e => setUserData(prev => ({...prev, email: e.target.value}))} />
            </div>
            <div>
            <label htmlFor="">User Role:</label>
            <select id="role" name="role" value={setUserData.role} onChange={e => setUserData(prev => ({...prev, role: e.target.value, permissions: permissions[e.target.value]}))}>
                <option value="x">x</option>
                <option value="y">y</option>
                <option value="z">z</option>
            </select>

            </div>
            <div>
                <label htmlFor="">User Permissions:</label>
                <div className="permissions">
                    {
                        userData.permissions.map(permission => <label key={permission}>{permission}</label>)
                    }
                </div>
            </div>

            <input type="submit" value="Create User"/>
        
        </form>
    </div>
  )
}

export default NewUser