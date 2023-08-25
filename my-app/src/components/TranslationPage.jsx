import './TranslationPage.css';


import React, { useState, useEffect } from 'react';
import { handleTranslate, PutUserTranslation } from './Api';
import { useNavigate } from 'react-router-dom';

const TranslationPage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [localUsername, setLocalUsername] = useState("");

  //Navigate around pages
  const nav = useNavigate();

  //Check username when component is mounted
  useEffect(() => {
    const locaStoragelUsername = localStorage.getItem("username");
    if (!locaStoragelUsername) {
      alert("Login First!");
      nav("/"); // No session? no access to translation page!
    } else {
      setLocalUsername(locaStoragelUsername);
    }
  }, [nav]);

  //Translate text to image hand signs - save it after
  const handleTranslation = async () => {
    const translated = await handleTranslate(inputText, localUsername);
    setTranslatedText(translated);

    // Save the translation for the user
    PutUserTranslation(localUsername, translated)
      .catch(error => {
        console.error("Failed to save translation: ", error);
      });
  };


  //Logic for logout button
  const handleLogout = () => {
    localStorage.setItem("username", "");

    nav("/");
  };

  return (
    <div className="translate-container">
      <h1 id='title'>Translation Page</h1>

      <hr width="20%" color='black'></hr>
      <h3>Welcome, {localUsername}</h3>
      <hr width="20%" color='black'></hr>

      <input
        placeholder='Send a message'
        className='form-field'
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button className='button' onClick={handleTranslation}>Translate</button>

      <div>
        <h3>Translated Text in Sign Language:</h3>
        <div className="translated-images">
          {translatedText.split('').map((letter, index) => (
            <img
              key={index}
              src={`/sign-language-images/${letter.toLowerCase()}.png`}
              alt={`Sign language for ${letter}`}
            />
          ))}
        </div>
      </div>
      <button className='button' onClick={handleLogout}>Logout</button>

    </div>

  );
};

export default TranslationPage;