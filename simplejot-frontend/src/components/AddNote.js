import React, { useContext, useState, useRef } from 'react'
import NoteContext from '../context/notes/noteContext'

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote ,showAlert } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const formRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }
    addNote(note.title, note.description, note.tag);
    showAlert("Note Added Successfully","success");
    setNote({ title: "", description: "", tag: "" });
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h2>Add a Note</h2>
      <form ref={formRef} className='my-3'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} minLength={10} required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </>
  )
}

export default AddNote