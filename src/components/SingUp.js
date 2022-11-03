import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SingUp = (props) => {
    const host = "http://localhost:5000"
    const navigate = useNavigate();
    const [creadentials,setCreadentials] = useState({name:"",email:"",password:"",phone:""});
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name,email,password,phone}=creadentials;// destruting methods
        const response = await fetch(`${host}/api/auth/createuser`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password,phone})
        });
        const json = await response.json()
        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.authtoken);// set/save token localstorage
            navigate('/')// redirect into home page
            props.showAlert("Account Created Successfully","success")
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
       <h2>Create A  To Continue To Diary_Book</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' value={creadentials.name} onChange={onChange} aria-describedby="emailHelp" placeholder='Enter Your Name ' required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name='email' value={creadentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder='Enter Your Email ' required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password'  value={creadentials.password} onChange={onChange} placeholder='Enter Your Password' required/>
  </div>
  {/* <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">ConfirmPassword</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword'  value={creadentials.cpassword} onChange={onChange} placeholder='Enter ConfirmYour Password'/>
  </div> */}
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Number</label>
    <input type="number" className="form-control" id="phone" name='phone'  value={creadentials.phone} onChange={onChange} placeholder='Enter Your Number' minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SingUp
