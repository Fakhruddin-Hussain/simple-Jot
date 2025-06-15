import NoteContext from "./noteContext";
import { useState } from "react";
const host = "http://localhost:5001"

const NoteState = (props) => {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  // Get all Notes
  const getNotes = async () => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzZTVmNDZiM2Y4NmE2NmU3MzY4NWZhIn0sImlhdCI6MTc0OTA1MzU4MH0.2GgnXde1Mg393cyaty9POPFci4cTXfq2bz6C8bhcYTI"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }




  // Add a new Note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      body: JSON.stringify({ title, description, tag }),
      headers: {
        'content-type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzZTVmNDZiM2Y4NmE2NmU3MzY4NWZhIn0sImlhdCI6MTc0OTA1MzU4MH0.2GgnXde1Mg393cyaty9POPFci4cTXfq2bz6C8bhcYTI"
      },
    });
    const json = await response.json();
    console.log(json);
    getNotes();


    const note = {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: title,
      description: description,
      tag: tag,
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  }

  // Delete an existing note
  const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzZTVmNDZiM2Y4NmE2NmU3MzY4NWZhIn0sImlhdCI6MTc0OTA1MzU4MH0.2GgnXde1Mg393cyaty9POPFci4cTXfq2bz6C8bhcYTI"
      },
    });
    const json = await response.json();
    console.log(json);
    showAlert("Note Deleted Successfully","success")
    getNotes();
    // setNotes(notes.filter(note => note._id !== id))
  }

  // Edit an existing note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, tag }),
      headers: {
        'content-type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgzZTVmNDZiM2Y4NmE2NmU3MzY4NWZhIn0sImlhdCI6MTc0OTA1MzU4MH0.2GgnXde1Mg393cyaty9POPFci4cTXfq2bz6C8bhcYTI"
      },
    });
    const json = await response.json();
    console.log(json);
    getNotes();

    // logic to edit in client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }
    // }
  };

  // Login using email and password
  const login = async (email,password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json'
      },
    });
    const json = await response.json();
    return json;
  };

  // Login using email and password
  const signup = async (name,email,password) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      body: JSON.stringify({name, email, password }),
      headers: {
        'content-type': 'application/json'
      },
    });
    const json = await response.json();
    return json;
  };

  return (
    <NoteContext.Provider value={{ notes,alert, addNote, deleteNote, editNote, getNotes,login,signup,showAlert }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
