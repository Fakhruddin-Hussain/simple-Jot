import './App.css';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Alert />
        <Navbar />
        <Routes>
          <Route exact path="/about" element={<About/>}>
          </Route>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route exact path="/login" element={<Login/>}>
          </Route>
          <Route exact path="/signup" element={<Signup/>}>
          </Route>
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
