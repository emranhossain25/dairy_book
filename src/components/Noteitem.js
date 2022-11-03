
// import React,{useContext} from "react";
// import noteContext from "../context/notes/noteContext";
// const Noteitem = (props) => {
//   const context = useContext(noteContext);
//   const {deleteNote} = context// use delete note
//   const { note,updateNote } = props; 
//   return (
//      <div className="col-md-3 my-3">
//       <div className="card" >
//         <div className="card-body">
//           <div className="d-flex align-items-center">
//           <h5 className="card-title">{note.title}</h5> <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>  updateNote(note._id)}></i>
//           <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
//           </div>
//           <p className="card-text">
//             {note.description}
//             <h6 className="card-title">{note.tag}</h6>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Noteitem;
// //onClick={()=>{deleteNote(note._id)}} ist give the id which u are want delete

import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <>
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <h6 className="card-title">{note.tag}</h6>
                </div>
            </div>
        </div>
        
      </>
    )
}
export default Noteitem;