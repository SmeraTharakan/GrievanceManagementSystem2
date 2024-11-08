import React from 'react'
import { useState, useEffect } from 'react';
import api from '../Api/api';
import './Grievance.css'

const Grievance = () => {
    const userId = localStorage.getItem("userId");
    const [grievances,setGrievances] =useState([])
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');        
    const [description, setDescription] = useState('');
    const [refresh, setRefresh] = useState(false);

    const listGrievance = ()=> api.get(`api/grievances/user/${userId}`);
    useEffect(()=> {
        listGrievance().then((response) =>{
            setGrievances(response.data || [])
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })

    },[refresh])

    const handleAddGrievance = async (e) => {
      e.preventDefault();
      const grievanceData = {
          title,
          description,
          userId: parseInt(userId)
      };

      try {
          const response = await api.post('/api/grievances/create', grievanceData);
          console.log('Grievance created successfully:', response.data);
          setTitle('');
          setDescription('');
          toggleModal();

          setRefresh(!refresh);
      } catch (error) {
          console.error('Error creating grievance:', error);
      }
  };

    const toggleModal = () => {
        setShowModal(!showModal);
      };


        
  return (
    <div className='container' >
        <div className='line'>
                <h2>Grievances</h2>
                <button className="add-grievance-btn" onClick={toggleModal}>
                +  Add Grievance
                </button>
        </div>
        <table className='table table-bordered table-hover' >
            <thead>
                <tr class="table-secondary">
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
                            <td >{grievance.id}</td>
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
        {showModal && (
        <div className="overlay">
          <div className="content">
            <h3>Add New Grievance</h3>
            <form className="gform"onSubmit={handleAddGrievance}>
              <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              </div>
              <div>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              </div>
              <div className="sub-can">
              <button type="submit">Submit</button>
              <button type="button" onClick={toggleModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Grievance