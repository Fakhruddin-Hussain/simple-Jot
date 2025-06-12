import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext';

const Login = () => {
    const context=useContext(NoteContext);
    const{login}=context;
    const [cred,setCred]=useState({email:"",password:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(cred)
        login(cred.email,cred.password);
    }
    const onChange = (e)=>{
        console.log(e);
        setCred({...cred,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={cred.email} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={cred.password} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login