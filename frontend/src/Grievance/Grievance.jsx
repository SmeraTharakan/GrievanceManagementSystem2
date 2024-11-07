import React from 'react'
import { useState, useEffect } from 'react';
import api from '../Api/api';

const Grievance = () => {
    const userId = localStorage.getItem("userId");
    const [grievances,setGrievances] =useState([])
    const listGrievance = ()=> api.get(`api/grievances/user/${userId}`);
    useEffect(()=> {
        listGrievance().then((response) =>{
            setGrievances(response.data || [])
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })

    },[])

        
  return (
    <div className='container'>
        <h2>Grievances</h2>
        <table className='table table-bordered table-dark'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>UserId</th>
                    <th>Status</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    grievances.map (grievance =>
                        <tr key={grievance.id}>
                            <td>{grievance.id}</td>
                            <td>{grievance.title}</td>
                            <td>{grievance.description}</td>
                            <td>{grievance.category}</td>
                            <td>{grievance.userId}</td>
                            <td>{grievance.status}</td>
                            
                        </tr>
                    )
                }

            </tbody>
        </table>
    </div>
  )
}

export default Grievance