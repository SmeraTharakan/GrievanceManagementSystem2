import React from 'react'
import { useState, useEffect } from 'react';
import api from '../Api/api.jsx';
import './Assignments.css';

const Assignments = () => {
    const userId = localStorage.getItem("userId");
    const [grievances,setGrievances] =useState([])
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [activeTab, setActiveTab] = useState("details");
    const [refresh, setRefresh] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const listGrievance = ()=> api.get(`api/grievances`);
    useEffect(()=> {
        listGrievance().then((response) =>{
            setGrievances(response.data || [])
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })

    },[refresh])

    const handleCategoryChange = async(e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        console.log(newCategory)
        try {

            const response = await api.put(`/api/grievances/updateCategory/${selectedGrievance.id}`, newCategory, {
                headers: { "Content-Type": "text/plain" }
            });
            
            console.log(`Successfully updated category`);
            setRefresh(!refresh);
        } catch (error) {
            console.error(`Error updating:`, error);
        }
    };

    const openModal = (grievance) => {
        setSelectedGrievance(grievance);
        if(grievance.category){
            setSelectedCategory(grievance.category)
        }
        else{
            setSelectedCategory("Choose Category")
        }
        
        setActiveTab("details");
    };

  return (
    <div className='container' >
        <div className='line'>
                <h2>Assign Grievances</h2>
        </div>
        <table className='table table-bordered table-hover' >
            <thead>
                <tr className="table-secondary">
                    <th>id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>UserId</th>
                    <th>Status</th>
                    <th>AssigneeId</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    grievances.map (grievance =>
                        <tr key={grievance.id} onClick={() => openModal(grievance)} style={{ cursor: 'pointer' }}>
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
        {selectedGrievance && (
                <div className="details-overlay">
                    <div className="details-content" onClick={(e) => e.stopPropagation()}>
                        <div className="close" onClick={() => setSelectedGrievance(null)}>X</div>
                        <nav className="details-navbar">
                            <button
                                className={activeTab === "details" ? "active" : ""}
                                onClick={() => setActiveTab("details")}
                            >
                                Grievance Details
                            </button>
                            <button
                                className={activeTab === "assign" ? "active" : ""}
                                onClick={() => setActiveTab("assign")}
                            >
                                Assign Details
                            </button>
                        </nav>

                        {activeTab === "details" && (
                            <div className="tab-content">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td><strong>ID:</strong></td>
                                            <td>{selectedGrievance.id}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Title:</strong></td>
                                            <td>{selectedGrievance.title}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Description:</strong></td>
                                            <td>{selectedGrievance.description}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Category:</strong></td>
                                            <td>
                                            <select
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="">Choose Category</option>
                                                <option value="Food">Food</option>
                                                <option value="Facilities">Facilities</option>
                                                <option value="Safety">Safety</option>
                                            </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Status:</strong></td>
                                            <td>{selectedGrievance.status}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>User ID:</strong></td>
                                            <td>{selectedGrievance.userId}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === "assign" && (
                            <div className="tab-content">
                                <p>This section can be used to add assignment information.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
    </div>
  );
}
export default Assignments