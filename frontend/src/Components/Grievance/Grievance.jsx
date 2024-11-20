import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../Api/api';
import './Grievance.css'
import bin from '../../assets/bin.png';
import edit from '../../assets/edit.png';
import add from '../../assets/add.png';
import empty from '../../assets/empty.png';

const Grievance = () => {
    const userId = localStorage.getItem("userId");
    const [grievances,setGrievances] =useState([])
    const [showAddModel, setShowAddModel] = useState(false);
    const [showEditModel, setShowEditModel] = useState(false);
    const [title, setTitle] = useState('');        
    const [description, setDescription] = useState('');
    const [gId,setGId] =useState();
    const [refresh, setRefresh] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const listGrievance = ()=> api.get(`api/grievances/user/${userId}`);
    useEffect(()=> {
        listGrievance().then((response) =>{
            setGrievances(response.data || [])
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })

    },[refresh])

    const handleDelete = async (id) => {
      try {
        const response = await api.delete(`/api/grievances/delete/${id}`,);
        console.log('Grievance deleted successfully',response.data);

        setRefresh(!refresh);
    } catch (error) {
        console.error('Error deleting grievance:', error);
    }
    };
  

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
          toggleAdd();

          setRefresh(!refresh);
      } catch (error) {
          console.error('Error creating grievance:', error);
      }
    };


    const updateDetails = async () => {
      const updateDetails = {
        title,
        description
    };
      try {
          const response = await api.put(`/api/grievances/updateDetails/${gId}`,updateDetails);

          console.log('Grievance updated successfully');

          setRefresh(!refresh); 
          setShowEditModel(false);
      } catch (error) {
          console.error('Error updating grievance:', error);
      }
    };

    const toggleAdd = () => {
        setShowAddModel(!showAddModel);
        setTitle('');
        setDescription('');
    };

    const openEditModel = (grievance) => {
        setTitle(grievance.title);      
        setDescription(grievance.description); 
        setShowEditModel(true);
        setGId(grievance.id);
    };

    const filteredGrievances = grievances.filter(grievance => {
      return (
          (categoryFilter === "" || grievance.category === categoryFilter) &&
          (statusFilter === "" || grievance.status === statusFilter)
      );
    });

  return (
    <div className='container' >
        <div className='line'>
                <h2>Grievances</h2>
                <img src={add} alt="Add"  onClick={toggleAdd} style={{ cursor: 'pointer', width: '33px' }}/>
        </div>
        <div className="filters">
                <label style={{ fontSize: '20px',marginRight: '50px' }}>Filter By</label>
                <label>Category:</label>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Safety">Safety</option>
                </select>

                <label>Status:</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Grievances</option>
                    <option value="Grievance submitted">Grievance submitted</option>
                    <option value="Grievance assigned">Grievance assigned</option>
                    <option value="Grievance resolved">Grievance resolved</option>
                </select>
        </div>
        {filteredGrievances.length > 0 ? (
              <table className='table table-bordered table-hover' >
                  <thead>
                      <tr className="table-secondary">
                          <th>id</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>UserId</th>
                          <th>Status</th>
                          <th>Action</th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      {
                          filteredGrievances.map (grievance =>
                              <tr key={grievance.id}>
                                  <td >{grievance.id}</td>
                                  <td>{grievance.title}</td>
                                  <td>{grievance.description}</td>
                                  <td>{grievance.category}</td>
                                  <td>{grievance.userId}</td>
                                  <td>{grievance.status}</td>
                                  <td>
                                      <img
                                          src={edit}
                                          alt="Update"
                                          onClick={() => openEditModel(grievance)}
                                          style={{ cursor: 'pointer', width: '20px', marginRight: '7px' }}
                                      />
                                      <img
                                          src={bin}
                                          alt="Delete"
                                          onClick={() => handleDelete(grievance.id)}
                                          style={{ cursor: 'pointer', width: '20px' }}
                                      />
                                  </td>
                                  
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
            <p>No Grievances yet</p>
            <button onClick={toggleAdd}>Add Grievance</button>
          </div>
        )}
        {showAddModel && (
        <div className="overlay">
          <div className="add-edit">
            <div onClick={() => setShowAddModel(false)} className='close'>&#x2715;</div>
            <h3>Add New Grievance</h3>
            <form className="add-edit-content">
              <div>
                <label>Title:</label>
                <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                </div>
              </div>
              <div>
              <label>Description:</label>
                <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                </div>
              </div>
            </form>
            <div className="bi-button">
                <button type="submit" onClick={handleAddGrievance}>Submit</button>
                <button type="button" onClick={toggleAdd}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showEditModel && (
        <div className="overlay">
            <div className="add-edit">
            <div onClick={() => setShowEditModel(false)} className='close'>&#x2715;</div>
              <h3>Edit Grievance</h3>
              <div className='add-edit-content'>
                <div>
                    <label>Title:</label>
                    <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    </div>
                </div>
                <div>
                    <label>Description:</label>
                    <div >
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </div>
                </div>
              </div>
              <div className="bi-button">
                  <button onClick={updateDetails}>Update</button>
                  <button type="button" onClick={() => setShowEditModel(false)}>Cancel</button>
              </div>
            </div>
        </div>
                
      )}
    </div>
  )
}

export default Grievance