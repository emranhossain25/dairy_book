import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const host = "http://localhost:5000"
    const [creadentials,setCreadentials] = useState({email:"",password:""})
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: creadentials.email,password: creadentials.password})
        })
        const json = await response.json()
        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.authtoken);// set/save token localstorage
            props.showAlert("Login Successfully","success")
            navigate('/')// redirect into home page
        }
    
        else{
          props.showAlert("invalid details","danger")
        }
    }

    const onChange = (e)=>{
        setCreadentials({ ...creadentials, [e.target.name]: e.target.value })
    }
  return (

    <div className='container mt-3'>
      <h2>Login To Continue To Diary_Book</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name='email' value={creadentials.email} aria-describedby="emailHelp" placeholder='Enter Your Email 'onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password'value={creadentials.password} placeholder='Enter Your Password' onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
