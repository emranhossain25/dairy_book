import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesIntial = []

    const [notes,setNotes] = useState(notesIntial);

    //get all notes

    const getallnotes = async()=>{
      const respose = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      }) 
      const json = await respose.json();
      setNotes(json)
    }
    //add note
    const addNote = async(title,description,tag)=>{
      const respose = await fetch(`${host}/api/notes/addnotes`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      }) 
      const note = await respose.json(); // strore the res in the note variaable
      setNotes(notes.concat(note))
    }

    // deletenote
    const deleteNote = async(id)=>{

      const respose = await fetch(`${host}/api/notes/deletenotes/${id}`,{
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
           "auth-token": localStorage.getItem('token')
        }
      }) 

      const json = respose.json();
      console.log(json)
      console.log("deleting note"+id)
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes)
    }
    // update note
    const editNote = async(id,title,description,tag)=>{
      //fetch api

      const respose = await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      })
      let newnotes = JSON.parse(JSON.stringify(notes))
      // logig for edit 
      for (let index = 0; index < newnotes.length; index++) {
        const element = newnotes[index];
        if(element._id === id){
          newnotes[index].title=title;
          newnotes[index].description=description;
          newnotes[index].tag=tag;
          break;
        }
      }
      setNotes(newnotes)
    }


    return(
        <NoteContext.Provider value={{notes,setNotes,getallnotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState