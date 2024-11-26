import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../Api/api.jsx';
import empty from '../../assets/empty.png';

const Assignee = () => {

    const userId = localStorage.getItem("userId");
    const [assignments, setAssignments] = useState([]);
    const [grievances, setGrievances] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await api.get(`/api/assignments/assignedto/${userId}`);
                setAssignments(response.data || []);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };
        fetchAssignments();
    }, [userId]);

    useEffect(() => {
        const fetchGrievances = async () => {
            const fetchedGrievances = [];
            for (const assignment of assignments) {
                try {
                    const response = await api.get(`/api/grievances/${assignment.grievanceId}`);
                    fetchedGrievances.push(response.data);
                } catch (error) {
                    console.error(`Error fetching grievance with ID ${assignment.grievanceId}:`, error);
                }
            }
            setGrievances(fetchedGrievances);
        };
        if (assignments.length) fetchGrievances();
    }, [assignments]);

    const handleStatusChange = async (grievanceId, newStatus) => {
        try {
            await api.put(`/api/grievances/updateStatus/${grievanceId}`, newStatus ,{
                headers: { "Content-Type": "text/plain" }
            });
            setGrievances(grievances.map(grievance => 
                grievance.id === grievanceId ? { ...grievance, status: newStatus } : grievance
            ));
        } catch (error) {
            console.error(`Error updating grievance status for ID ${grievanceId}:`, error);
        }
    };

    const filteredGrievances = grievances.filter(grievance => {
        return (
            (categoryFilter === "" || grievance.category === categoryFilter) &&
            (statusFilter === "" || grievance.status === statusFilter)
        );
    });

    return (
        <div className="container">
            <div className='line'>
                <h2>Assigned Grievances</h2>
            </div>
            <div className="filters">
                <label style={{ fontSize: '20px',marginRight: '50px' }}>Filter By</label>
                <label>Category:</label>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Safety">Safety</option>
                    <option value="Technical">Technical</option>
                    <option value="Other">Other</option>
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
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="table-secondary">
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Assigned By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGrievances.map((grievance) => (
                                <tr key={grievance.id}>
                                    <td>{grievance.id}</td>
                                    <td>{grievance.title}</td>
                                    <td>{grievance.description}</td>
                                    <td>{grievance.category}</td>
                                    <td>
                                        <select
                                            value={grievance.status}
                                            onChange={(e) => handleStatusChange(grievance.id, e.target.value)}
                                        >
                                            <option value="Grievance assigned">Grievance assigned</option>
                                            <option value="Grievance resolved">Grievance resolved</option>
                                        </select>
                                    </td>
                                    <td>{assignments.find(a => a.grievanceId === grievance.id)?.supervisorId}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            ) : (
            <div className='empty-container'>
                <img 
                src={empty}
                style={{width: '100px', height:'100px', margin:'30px 0 60px 0'}}/>
                <p>No Grievances assigned</p>
            </div>
            )}
        </div>
    )
}

export default Assignee