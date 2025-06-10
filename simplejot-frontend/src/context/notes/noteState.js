import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    },
    {
      _id: "683f2f9ba3f0c3dca4181030",
      user: "683e5f46b3f86a66e73685fa",
      title: "My First Note",
      description: "This is my very first note on my note taking web app",
      tag: "#firstNote",
      date: "2025-06-03T17:23:39.942Z",
      __v: 0,
    }
  ];
  const [notes,setNotes]= useState(initialNotes)

  return (
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
