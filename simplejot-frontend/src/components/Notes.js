import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        getNotes();
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note,setNote] = useState({id:"", etitle:"",edescription:"",etag:""})
    
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
      const handleClick=(e)=>{
        console.log("Updating note",note)
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
      }
      const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
      }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch modal
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form classNameName='my-3'>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} />;
                })}
            </div>
        </>
    )
}

export default Notes