
import React, { useState, useEffect} from 'react';
import "./Users.css";
import { fetchUsers } from '../api/fetch_users';
import { removeUser } from '../api/delete_user';
import { patchUser } from '../api/patch_user';

import Filter from '../filter/Filter';

const Users = () => {
    const [users, setUsers] = useState([])
    const [filters, setFilters] = useState({})

    useEffect(() => {
        fetchUsers(filters).then(res => setUsers(res?.data?.users || []))
    }, [filters])

    const deleteUser = (id) => {
        removeUser(id).then(res => res.is_successful && setUsers(prev => prev.filter(user => user.id !== id)))
    }

    const updateUser = (id, new_role) => {
        patchUser(id, new_role)
        .then(res => res.is_successful && 
            setUsers(prev => prev.map(user => user.id === id ? {...user, role: new_role} : user))  
        )
    }

    console.log(users)
  return (
    <div className='users'>
        <h1>Users</h1>
        <Filter filters={filters} setFilters={setFilters}/>
        <table border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th>Edit Role</th>
                    <th>Delete User</th>
                </tr>
            </thead>
            <tbody>
                {
                    users?.map( user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <ul>
                                    {
                                        user.permissions.map(permission => <li key={permission}>{permission}</li>)
                                    }
                                </ul>
                            </td>
                            <td>
                                <select id="role" name="role" value={user.role} onChange={e => updateUser(user.id, e.target.value)}>
                                    <option value="x">x</option>
                                    <option value="y">y</option>
                                    <option value="z">z</option>
                                </select>
                            </td>
                            <td onClick={() => deleteUser(user.id)}>
                                <button className='btn'>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>
  )
}

export default Users