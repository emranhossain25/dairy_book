import React, { useContext, useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getallnotes,editNote,addNote } = context; // set the context
  useEffect(() => {
    if(localStorage.getItem('token')){// if user is login
      getallnotes(); // dor feting all notes
    }
    else{
      navigate('/login')
    }
  }); // [](i give this its only render one) i revomev because its couses some problem in frontend

  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  //create the updateNote variable
  const updateNote = (currentNote) => {
    ref.current.click();
    //setNote(currentNote)
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    props.showAlert("Updated Successfully","success")
  };
  const ref = useRef(null)
  const refclose= useRef(null)

  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click()
    props.showAlert("Updated Successfully","success")
   // run the add note function
    // run the add note function
  }
  const onChange=(e)=>{ // e= event
    setNote({ ...note, [e.target.name]: e.target.value })
     // ...note sparate operator let it be and add/overide another
    // [e.target.name]: e.target.value } set the name to his value
  }
  return (

    <>
      <Addnote showAlert={props.showAlert} />

<button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Your Diary</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-4 my-5">
        <label for="exampleFormControlInput1" className="form-label">
          TITLE
        </label>
        <input
          type="text"
          className="form-control"
          id="etitle"
          name='etitle'
          placeholder="title"
          value={note.etitle}
          onChange={onChange}
          minLength={5} required
        />
      </div>
      <div className="mb-3 my-">
        <label for="exampleFormControlTextarea1" className="form-label">
          DESCRIPTION
        </label>
        <textarea
          className="form-control"
          name='edescription'
          id="edescription"
          rows="4"
          value={note.edescription}
          onChange={onChange}
          minLength={5} required
        > </textarea>

      </div>
      <div className="mb-3 my-3">
        <label for="exampleFormControlInput1" className="form-label">
          TAG
        </label>
        <input
          type="text"
          name='etag'
          className="form-control"
          id="etag"
          placeholder="tag"
          value={note.etag}
          onChange={onChange}
    
        />
        </div>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* <button type="button" disabled={note.etitle.length<5|| note.edescription.length<5 } className="btn btn-primary" onClick={handleClick}>Update Note</button> */}
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h2 >Your Diary</h2>
        {notes.length===0 && 'No Notes Avaible '}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
      <div class="d-flex flex-column flex-sm-row text-center justify-content-center border-top">
        <p>©DESIGN AND CREATED BY EMRAN HOSSAIN !ALL RIGHT RESERVED</p>
      </div>
    </>
  );
};

export default Notes;
