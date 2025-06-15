import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';



const Signup = () => {
  const context=useContext(NoteContext);
    const{signup,showAlert}=context;
    const [cred,setCred]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const json= await signup(cred.name,cred.email,cred.password);
        console.log(json);
        if (json.success){
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            showAlert("Account Created Successfully","success")
        }else(
            showAlert(json.error,"danger")
        )
    }
    const onChange = (e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }
  return (
    <div className='container mt-5'>
      <h2 className='my-2'>Create an account to use Simple-Jot</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' id="name" onChange={onChange} required  aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" onChange={onChange} required autoComplete='email' aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={8} autoComplete='new-password' />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} minLength={8} autoComplete='new-password'/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup