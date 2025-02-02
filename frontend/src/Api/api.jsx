import axios from 'axios';

const api=axios.create ({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: { 
        'Content-Type': 'application/json', 
    },
}) 


api.interceptors.request.use( (config) => { 
    const token = localStorage.getItem('jwtToken'); 
    //console.log(token)
    if (token) { 
        config.headers['Authorization'] = `Bearer ${token}`; 
    } 
    
    return config; 
}, (error) => { return Promise.reject(error); } );


export default api;