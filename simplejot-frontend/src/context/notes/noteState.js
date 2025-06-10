import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "683f2f9ba3f0c3dca4181010",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dca4181430",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c33dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c2fd3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0cfdg3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3ddfsgca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dserfsca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3fef0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    }
  ];
  const [notes,setNotes]= useState(initialNotes)

  // Add a new Note
  const addNote=(title, description,tag)=>{
    // TODO: API call
    const note = {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: title,
      description: description,
      tag: tag,
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    };
    setNotes( notes.concat(note));
  }

  // Delete an existing note
  const deleteNote=(id)=>{
    // TODO: API Call
    setNotes(notes.filter(note=> note._id !== id))
  }

  // Edit an existing note
  const editNote=(id,title,description,tag)=>{
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id===id) {
        element.title=title;
        element.description=description;
        element.tag=tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
        {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
