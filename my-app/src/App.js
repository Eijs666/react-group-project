import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Register from "./components/Register";
import TranslationPage from "./components/TranslationPage";
import ProfilePage from './components/ProfilePage';
import "./App.css"
import { TranslationsProvider } from './components/Context';

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
       <TranslationsProvider>

        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/translation" element={<TranslationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route path="/register" element={<Register/>} />

        
        </Routes>
        
       </TranslationsProvider>
      </div>
    </Router>
  );
}
export default App