import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../Api/api.jsx';
import './Supervisor.css'
import edit from '../../assets/edit.png';
import tick from '../../assets/tick.png';
import empty from '../../assets/empty.png';
import { useAuth } from '../../Auth/AuthProvider';

const Supervisor = () => {
    const userId = localStorage.getItem("userId");
    const {user} = useAuth();
    const [grievances,setGrievances] =useState([]);
    const [assignments, setAssignments] = useState({});
    const [activeTab, setActiveTab] = useState("details");
    const [refresh, setRefresh] = useState(false);
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [assigneeId, setAssigneeId] = useState("");
    const [supervisorId, setSupervisorId] = useState("");
    const [isEditingAssignee, setIsEditingAssignee] = useState(false);
    const [isEditingSupervisor, setIsEditingSupervisor] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [userFilter, setUserFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    

    const listGrievance = ()=> api.get(`api/grievances`);
    useEffect(()=> {
        listGrievance().then((response) =>{
            setGrievances(response.data || [])
            console.log(response.data)
        }).catch(error => {
            console.error(error);
        })

    },[refresh])

    useEffect(() => {
        const fetchAssignments = async () => {
            const assignmentsData = {};
            for (const grievance of grievances) {
                try {
                    const response = await api.get(`/api/assignments/grievance/${grievance.id}`);
                    assignmentsData[grievance.id] = response.data;
                } catch (error) {
                    console.error(`Error fetching assignment for grievance ID ${grievance.id}:`, error);
                }
            }
            setAssignments(assignmentsData);
        };

        if (grievances.length) fetchAssignments();
    }, [grievances,refresh]);

    const handleCategoryChange = async(newCategory) => {
        setSelectedCategory(newCategory);
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

    const addAssignment = async () => {
        console.log(assigneeId);
        try {
            const newAssignment = {
                supervisorId: userId, 
                assigneeId: assigneeId,
                grievanceId: selectedGrievance ? selectedGrievance.id : null
            };
            await api.post('/api/assignments/create', newAssignment);
            await api.put(`/api/grievances/updateStatus/${selectedGrievance.id}`, "Grievance assigned" ,{
                headers: { "Content-Type": "text/plain" }
            });

            setRefresh(!refresh);  
             
        } catch (error) {
            console.error("Error adding assignment:", error);
        }
    };

    const updateAssigneeId = async () => {
        try {
            await api.put(`/api/assignments/updateAssignee/${assignments[selectedGrievance.id].assignmentId}`,{ assigneeId: assigneeId });
            console.log("Assignee ID updated successfully");
            setIsEditingAssignee(false);
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error updating Assignee ID:", error);
        }
    };

    const updateSupervisorId = async () => {
        try {
            await api.put(`/api/assignments/updateSupervisor/${assignments[selectedGrievance.id].assignmentId}`, { supervisorId });
            console.log("Supervisor ID updated successfully");
            setIsEditingSupervisor(false);
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error updating Supervisor ID:", error);
        }
    };

    const deleteAssignment = async () => {
        try {
            const response = await api.delete(`/api/assignments/delete/${assignments[selectedGrievance.id].assignmentId}`);
            console.log("Assignment deleted successfully:", response.data);

            setRefresh(!refresh);  
             
        } catch (error) {
            console.error("Error deleting assignment:", error);
        }
    };

    const openModal = (grievance) => {
        setSelectedGrievance(grievance);
        setIsEditingAssignee(false);
        setIsEditingSupervisor(false);
        setAssigneeId(assignments[grievance.id]?.assigneeId || "");
        setAssigneeId(assignments[grievance.id]?.SupervisorId || "");
        if(grievance.category){
            setSelectedCategory(grievance.category)
        }
        else{
            setSelectedCategory("Choose Category")
        }
        setActiveTab("details");

    };

    const filteredGrievances = grievances.filter(grievance => {
        return (
            (categoryFilter === "" || grievance.category === categoryFilter) &&
            (userFilter === "" || grievance.userId.toString() === userFilter) &&
            (statusFilter === "" || grievance.status === statusFilter)
        );
    });

  return (
    <div className='container'>
            <div className='line'>
                <h2>{user.role === 'ADMIN' ? "Grievances and Assignments" : "Assign Grievances"}</h2>
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

                <label>User ID:</label>
                <input
                    type="text"
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    placeholder="Enter User ID"
                />

                <label>Status:</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Grievances</option>
                    <option value="Grievance submitted">Grievance submitted</option>
                    <option value="Grievance assigned">Grievance assigned</option>
                    <option value="Grievance resolved">Grievance resolved</option>
                </select>
            </div>

            {filteredGrievances.length > 0 ? (
                <>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr className="table-secondary">
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>User ID</th>
                                <th>Status</th>
                                <th>Assignee ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGrievances.map(grievance => (
                                <tr key={grievance.id} onClick={() => openModal(grievance)} style={{ cursor: 'pointer' }}>
                                    <td>{grievance.id}</td>
                                    <td>{grievance.title}</td>
                                    <td>{grievance.description}</td>
                                    <td>{grievance.category}</td>
                                    <td>{grievance.userId}</td>
                                    <td>{grievance.status}</td>
                                    <td>{assignments[grievance.id]?.assigneeId || "Unassigned"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className='empty-container'>
                    <img src={empty} style={{ width: '100px', height: '100px', margin: '30px 0' }} />
                    <p>No Grievances to assign</p>
                </div>
            )}
            {selectedGrievance && (
                    <div className="overlay">
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
                                                    onChange={(e) => handleCategoryChange(e.target.value)}
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
                                    {assignments[selectedGrievance.id] && Object.keys(assignments[selectedGrievance.id]).length > 0? (
                                        <div className='assignment-content'>
                                        <table className="table">
                                            <tbody>
                                                <tr><td><strong>Assignment ID:</strong></td><td>{assignments[selectedGrievance.id].assignmentId}</td></tr>
                                                <tr><td><strong>Grievance ID:</strong></td><td>{assignments[selectedGrievance.id].grievanceId}</td></tr>
                                                <tr><td><strong>Supervisor ID:</strong></td>
                                                <td>
                                                    {user.role === "ADMIN" && isEditingSupervisor ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={supervisorId}
                                                                    onChange={(e) => setSupervisorId(e.target.value)}
                                                                />
                                                                <img src={tick} alt="confirm" onClick={updateSupervisorId} style={{ cursor: 'pointer', marginLeft: '10px', width: '20px' }} />
                                                            </>
                                                        ) : (
                                                            <>
                                                                {assignments[selectedGrievance.id].supervisorId}
                                                                {user.role === "ADMIN" && (
                                                                    <img src={edit} alt="edit" onClick={() => setIsEditingSupervisor(true)} style={{ cursor: 'pointer', marginLeft: '50px', width: '20px' }} />
                                                                )}
                                                            </>
                                                        )}
                                                    
                                                </td></tr>
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
                                                                    {assignments[selectedGrievance.id].assigneeId}
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