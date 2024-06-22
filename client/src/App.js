import './components/css/App.css';
import './components/Navbar';
import './components/Button';

import Home from "./components/Home"

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Home />
        <Routes>
            <Route path="/posts" />
            <Route path="/signup"  />
            <Route path="/login" />
            <Route path='/logout' />
            <Route path="/posts/edit" />
            <Route path="/posts" />
            <Route path="/report" />
            <Route path="/posts/addpost"  />
        </Routes>
      </Router>
  );
}

export default App;
