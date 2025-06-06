import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/about" element={<About/>}>
            {/* <About /> */}
          </Route>
          <Route exact path="/home" element={<Home/>}>
            {/* <Home /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
