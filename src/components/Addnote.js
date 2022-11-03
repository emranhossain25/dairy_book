import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";


const Addnote = (props) => {
    const context = useContext(noteContext)
    const  {addNote} = context // set the context
    const [note,setNote]=useState({title:"",description:"",tag:""})
    
    const handleClick=(e)=>{
      e.preventDefault()
      addNote(note.title,note.description,note.tag)// run the add note function
      setNote({title:"",description:"",tag:""});
      props.showAlert("Added  Successfully","success")
    }
    const onChange=(e)=>{ // e= event
      setNote({ ...note, [e.target.name]: e.target.value }) // ...note sparate operator let it be and add/overide another
      // [e.target.name]: e.target.value } set the name to his value
    }

    
  return (
    <>
      <div className="container my-3">
      <h2>Add  A Diary</h2>
      <form>
      <div className="mb-4 my-5">
        <label for="exampleFormControlInput1" className="form-label">
          TITLE
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name='title'
          placeholder="title"
          onChange={onChange}
          value={note.title}
          minLength={5} required
        />
      </div>
      <div className="mb-3 my-">
        <label for="exampleFormControlTextarea1" className="form-label">
          DESCRIPTION
        </label>
        <textarea
          className="form-control"
          name='description'
          id="description"
          rows="4"
          onChange={onChange}
          minLength={5} required
          value={note.description}
        > </textarea>

      </div>
      <div className="mb-3 my-3">
        <label for="exampleFormControlInput1" className="form-label">
          TAG
        </label>
        <input
          type="text"
          name='tag'
          className="form-control"
          id="tag"
          placeholder="tag"
          value={note.tag}
          onChange={onChange}
        />
      </div>
      </form>

      {/* <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label" >Email address</label>
    <input type="text" class="form-control" id="title"
          name='title'
           aria-describedby="emailHelp"
    onChange={onChange}
    minLength={5} required
    value={note.email}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label" >Des</label>
    <input type="text" class="form-control" onChange={onChange}
    name='description'
    id="description"
          minLength={5} required
          value={note.description}/>
  </div> 
</form> */}
      <button disabled={note.title.length<5|| note.description.length<5 } type="submit" class="btn btn-primary" onClick={handleClick}>Add Diary</button>
    </div>
    </>
  )
}

export default Addnote
