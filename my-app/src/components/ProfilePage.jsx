import './ProfilePage.css';

import React, { useState, useEffect } from 'react';
import { fetchLastTenTranslations, handleClearTranslations } from './Api';

function ProfilePage() {
  const [displayTranslations, setDisplayTranslations] = useState([]);
  const userName = 'YHU';

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
    <div>
      <h2>Profile</h2>
      <h3>Translated Text:</h3>
      <ul>
        {displayTranslations.map((translation, index) => (
          <li key={index}>{translation}</li>
        ))}
      </ul>
      <button onClick={clearTranslations}>Clear Translations</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
