import './ProfilePage.css';

import React, { useState, useEffect } from 'react';
import { fetchLastTenTranslations, handleClearTranslations } from './Api';

function ProfilePage() {
  const [displayTranslations, setDisplayTranslations] = useState([]);
  const [localusername, setLocalUsername] = useState("");

  useEffect(() => {
    const locaStoragelUsername = localStorage.getItem("username");
    if (locaStoragelUsername) {
      setLocalUsername(locaStoragelUsername);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (localusername) { // Ensure localusername is not empty before making the API call
        const lastTenTranslations = await fetchLastTenTranslations(localusername);
        setDisplayTranslations(lastTenTranslations);
      }
    };

    fetchData();
  }, [localusername]); // Trigger the effect when localusername changes

  const clearTranslations = async () => {
    const clearedTranslations = await handleClearTranslations(localusername);
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
