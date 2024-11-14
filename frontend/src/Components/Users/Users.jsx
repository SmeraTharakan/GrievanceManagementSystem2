import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../Api/api';
import './Users.css'
import empty from '../../assets/empty.png';

const Users = () => {

  const [users,setUsers] =useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const listUsers = ()=> api.get('api/users');
    
  useEffect(()=> {
        listUsers().then((response) =>{
            setUsers(response.data || [])
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })
  },[])

  const filteredUsers = users.filter(user => {
    return (
        (roleFilter === "" || user.role === roleFilter)
    );
  });

  
  return (
    <div className='container' >
        <div className='line'>
                <h2>Users</h2>
        </div>
        <div className="filters">
                <label style={{ fontSize: '20px',marginRight: '50px' }}>Filter By</label>
                <label>Roles:</label>
                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="USER">USER</option>
                    <option value="SUPERVISOR">SUPERVISOR</option>
                    <option value="ASSIGNEE">ASSIGNEE</option>
                </select>
        </div>
        {filteredUsers.length > 0 ? (
        <table className='table table-bordered table-hover' >
                  <thead>
                      <tr className="table-secondary">
                          <th>Id</th>
                          <th>Username</th>
                          <th>Email Id</th>
                          <th>Role</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          filteredUsers.map (user =>
                              <tr key={user.id}>
                                  <td >{user.id}</td>
                                  <td>{user.username}</td>
                                  <td>{user.email}</td>
                                  <td>{user.role}</td>
                                  
                              </tr>
                          )
                      }

                  </tbody>
              </table>
              ) : (
                <div className='empty-container'>
                  <img 
                  src={empty}
                  style={{width: '100px', height:'100px', margin:'30px 0'}}/>
                  <p>No Users in that Role</p>
                </div>
              )}
    </div>
  )
}

export default Users