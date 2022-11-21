import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Jobs from './Pages/Jobs';
import Contact from './Pages/Contact';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to = '/'>Joyalukkas</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link className="nav-link" to = '/home'>Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to = "/about">About</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to = "/jobs">Jobs</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to = "/contact">Contact</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <Routes>
      <Route path = "/" element = {<Login/>}></Route>
      <Route path = "/home" element = {<Home/>}></Route>
      <Route path = "/about" element = {<About/>}></Route>
      <Route path = "/jobs" element = {<Jobs/>}></Route>
      <Route path = "/contact" element = {<Contact/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
