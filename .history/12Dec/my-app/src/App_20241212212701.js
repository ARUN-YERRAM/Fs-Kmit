// import logo from './logo.svg';
import './App.css';
import Signup from "./components/Signup.js";
import Login from "./components/login.js";
import Dashboard from "./components/Dashboard.js";
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
