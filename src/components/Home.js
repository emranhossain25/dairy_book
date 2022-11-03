import React,{useContext} from "react";
import Addnote from "./Addnote";
import Notes from "./Notes";
function Home(props) {
  const {showAlert} = props //destruction
  return (
    <>
    <div className="container"><Notes showAlert={showAlert}/></div>  
    </>
  );
}

export default Home;
