import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../Api/api.jsx';
import './Supervisor.css'
import edit from '../../assets/edit.png';
import tick from '../../assets/tick.png';

const Supervisor = () => {
    const userId = localStorage.getItem("userId");
    const [grievances,setGrievances] =useState([])
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [activeTab, setActiveTab] = useState("details");
    const [refresh, setRefresh] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [assignment, setAssignment] = useState(null);
    const [assigneeId, setAssigneeId] = useState("");
    const [isEditingAssignee, setIsEditingAssignee] = useState(false);
    

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

    const fetchAssignmentDetails = async (grievanceId) => {
        
        try {
            const response = await api.get(`/api/assignments/grievance/${grievanceId}`);
            if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                setAssignment(response.data);
            } else {
                setAssignment(null); 
                console.log("No assignment found or data is invalid");
            }
        } catch (error) {
            console.error("Error fetching assignment:", error);
            setAssignment(null); 
        }
    };

    const addAssignment = async () => {
        console.log(assigneeId);
        try {
            const newAssignment = {
                supervisorId: userId, 
                assigneeId: assigneeId,
                grievanceId: selectedGrievance ? selectedGrievance.id : null
            };
            const response = await api.post('/api/assignments/create', newAssignment);
            console.log("Assignment added successfully:", response.data);

            fetchAssignmentDetails(selectedGrievance.id);
            setRefresh(!refresh);  
            setAssignment(response.data); 
        } catch (error) {
            console.error("Error adding assignment:", error);
        }
    };

    const updateAssigneeId = async () => {
        console.log(assignment.assignmentId);
        try {
            const response = await api.put(`/api/assignments/updateAssignee/${assignment.assignmentId}`,{ assigneeId: assigneeId });
            console.log("Assignee ID updated successfully");
            setIsEditingAssignee(false);
            fetchAssignmentDetails(selectedGrievance.id);
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error updating Assignee ID:", error);
        }
    };

    const deleteAssignment = async () => {
        try {
            const response = await api.delete(`/api/assignments/delete/${assignment.assignmentId}`);
            console.log("Assignment deleted successfully:", response.data);

            setAssignment(null);
            fetchAssignmentDetails(selectedGrievance.id);
            setRefresh(!refresh);  
            setAssignment(response.data); 
        } catch (error) {
            console.error("Error deleting assignment:", error);
        }
    };

    const openModal = (grievance) => {
        setAssignment(null);
        setAssigneeId("");
        setSelectedGrievance(grievance);
        setIsEditingAssignee(false)
        if(grievance.category){
            setSelectedCategory(grievance.category)
        }
        else{
            setSelectedCategory("Choose Category")
        }
        fetchAssignmentDetails(grievance.id);
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
                                {assignment && Object.keys(assignment).length > 0? (
                                    <div className='assign-container'>
                                    <table className="table">
                                        <tbody>
                                            <tr><td><strong>Assignment ID:</strong></td><td>{assignment.assignmentId}</td></tr>
                                            <tr><td><strong>Grievance ID:</strong></td><td>{assignment.grievanceId}</td></tr>
                                            <tr><td><strong>Supervisor ID:</strong></td><td>{assignment.supervisorId}</td></tr>
                                            <tr><td><strong>Assignee ID:</strong></td>
                                                    <td>
                                                        {isEditingAssignee ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={assigneeId}
                                                                    onChange={(e) => setAssigneeId(e.target.value)}
                                                                />
                                                                <img src={tick} 
                                                                alt="confirm" 
                                                                onClick={updateAssigneeId} 
                                                                style={{ cursor: 'pointer', marginLeft: '10px', width: '20px' }} />
                                                            </>
                                                        ) : (
                                                            <>
                                                                {assignment.assigneeId}
                                                                <img src={edit} 
                                                                alt="edit" 
                                                                onClick={() => setIsEditingAssignee(true)} 
                                                                style={{ cursor: 'pointer', marginLeft: '50px', width: '20px' }} />
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>

                                        </tbody>
                                    </table>
                                    <button className='dlt-btn' onClick={deleteAssignment}>Delete Assignment</button>
                                    </div>
                                ) : (
                                    <div className='add-assignee'>
                                        <div>
                                        <label><strong>Assignee ID:</strong></label>
                                        <input
                                            type="text"
                                            name="assigneeId"
                                            value={assigneeId}
                                            onChange={(e) => setAssigneeId(e.target.value)}
                                            placeholder="Enter Assignee ID"
                                        />
                                        </div>
                                        <button onClick={addAssignment}>Add Assignment</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
    </div>
  );
}
export default Supervisor