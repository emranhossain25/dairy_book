import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SingUp from "./components/SingUp";
import React, { useState } from 'react';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
   <>
   <NoteState>
   <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <Routes>
        <Route path="/" element={<Home showAlert={showAlert} />} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login showAlert={showAlert} />} />
        <Route path="/signup" element={<SingUp showAlert={showAlert}/>} />
      </Routes>
   </Router>
   </NoteState>
   </>
  );
}

export default App;
