// import logo from './logo.svg';
import './App.css';
import Signup from "./components/Signup.js";
import Login from "./components/login.js";
import Dashboard from "./components/Dashboard.js";
import {BrowserRouter,Router,Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Router>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
          </Router>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
