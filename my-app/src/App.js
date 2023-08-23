import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Register from "./components/Register";
import TranslationPage from './components/TranslationPage';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">

      <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/translation">Translation</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>

          </ul>
        </nav>
       

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/translation" element={<TranslationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<Register/>} />

        
        </Routes>
      </div>
    </Router>
  );
}
export default App