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
function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Alert message="This is an Alert message"/>
        <Navbar />
        <Routes>
          <Route exact path="/about" element={<About/>}>
          </Route>
          <Route exact path="/" element={<Home/>}>
          </Route>
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
