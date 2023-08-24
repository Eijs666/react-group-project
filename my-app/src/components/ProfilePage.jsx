import './ProfilePage.css';

import React, { useState, useEffect } from 'react';
import { fetchLastTenTranslations, handleClearTranslations } from './Api';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [displayTranslations, setDisplayTranslations] = useState([]);
  const userName = 'YHU';

  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const lastTenTranslations = await fetchLastTenTranslations(userName);
      setDisplayTranslations(lastTenTranslations);
    };

    fetchData();
  }, []);

  const clearTranslations = async () => {
    const clearedTranslations = await handleClearTranslations(userName);
    setDisplayTranslations(clearedTranslations);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="profile-container">
      <h2 id='title'>Profile</h2>

      <hr width="20%" color='black'></hr>
      <h3>Translated Text</h3>
      <hr width="20%" color='black'></hr>

      <ul id='translations'>
        {displayTranslations.map((translation, index) => (
          <li key={index}>{translation}</li>
        ))}
      </ul>
      <button className='button' onClick={clearTranslations}>Clear Translations</button>
      <button className='button' onClick={() => {nav("/")}}>Logout</button>
    </div>
  );
}

export default ProfilePage;
