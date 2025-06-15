import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';

const Login = () => {
    const context=useContext(NoteContext);
    const{login,showAlert}=context;
    const [cred,setCred]=useState({email:"",password:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const json= await login(cred.email,cred.password);
        console.log(json);
        if (json.success){
            localStorage.setItem('token',json.authtoken);
            showAlert("Logged in Succesfully","success")
            navigate('/');
        }else(
            showAlert(json.error,"danger")
        )
    }
    const onChange = (e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }
    return (
        <div className='container mt-5'>
            <h2 className='my-2'>Login To Continue to Simple-Jot</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={cred.email} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={cred.password} id="password" name='password' autoComplete='current-password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login