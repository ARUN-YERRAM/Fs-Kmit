// import logo from './logo.svg';
import './App.css';
import Signup from "./components/Signup.js";
import "./components/login.js";
import "./components/Dashboard.js";
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Route path="/" element={<Signup />} />

      </header>
    </div>
  );
}

export default App;
