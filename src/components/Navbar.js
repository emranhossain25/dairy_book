import React,{useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link,useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  let location = useLocation();
  useEffect(()=>{
  },[location])

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">DIARY_BOOK</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">HOME</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">ABOUT</Link>
        </li>
      </ul>

      
</div>
<div>
    {!localStorage.getItem('token')?<form className="d-flex">
    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
    <Link className="btn btn-primary mx-1" to="/signup" role="button">signup</Link>
    </form>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button> }
    </div>
  </div>
</nav>
    </>
)
}

export default Navbar
