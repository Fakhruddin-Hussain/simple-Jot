import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

function AddNote() {
  const context = useContext(NoteContext);
  const {addNote}= context;
  const [note,setNote] = useState({title:"",description:"",tag:""})

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <>
    <h2>Add a Note</h2>
      <form className='my-3'>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Description</label>
          <input type="text" class="form-control" id="description" name="description" onChange={onChange} />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </>
  )
}

export default AddNote