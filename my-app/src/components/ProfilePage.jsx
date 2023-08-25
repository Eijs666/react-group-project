import './ProfilePage.css';

import React, { useState, useEffect } from 'react';
import { FetchLastTenTranslations, handleClearTranslations, GetUserApi } from './Api';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from './Context';


function ProfilePage() {
  const [localUsername, setLocalUsername] = useState("");
  const [displayTranslations, setDisplayTranslations] = useState([]);
  const { lastTenTranslations, setLastTenTranslations } = useTranslations();
  const [isCleared, setIsCleared] = useState(false);

  //To navigate between pages
  const nav = useNavigate();

  //If user exist fetch data from api - if user dont exist, redirect to homepage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        setLocalUsername(storedUsername);
        if (storedUsername) {
          const userData = await GetUserApi(storedUsername);
          setLocalUsername(userData.username);
        } else {
          alert("Login First!");
          nav("/");
        }
      } catch (error) {
        console.error("Cant fetch user data", error);
        alert("fetching user data Error");
      }
    };
    fetchUser();
  }, [nav]);

  //Update state and get last 10 translation
  //Update state and get last 10 translations based on username
  useEffect(() => {
    const fetchData = async () => {
      try {
        const translations = await FetchLastTenTranslations(localUsername);
        setLastTenTranslations(translations);
      } catch (error) {
        console.error("Failed to fetch translations", error);
      }
    };

    if (localUsername) {
      fetchData();
    }
  }, [localUsername, setLastTenTranslations])


  //Logic for clear button - change state from context api
  const clearTranslations = async () => {
    try {
      await handleClearTranslations(localUsername);
      setIsCleared(true);
    } catch (error) {
      console.error("Failed to clear translations", error);
    }
  };

  //Logic for logout button
  const handleLogout = () => {
    localStorage.setItem("username", "");

    nav("/");
  };

  return (
    <div className="profile-container">
      <h2 id='title'>Profile Page</h2>

      <hr width="20%" color='black'></hr>
      <h3>Translated text from: {localUsername}</h3>
      <hr width="20%" color='black'></hr>

      <ul id='translations'>
        {isCleared ? (
          <li>Translations cleared</li>
        ) : (
          lastTenTranslations.map((translation, index) => (
            <li key={index}>{translation}</li>
          ))
        )}

      </ul>

      <button className='button' onClick={clearTranslations}>Clear Translations</button>
      <button className='button' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
