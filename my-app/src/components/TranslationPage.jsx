import './TranslationPage.css';


import React, { useState, useEffect } from 'react';
import { handleTranslate } from './Api'; 

const TranslationPage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [localUsername, setLocalUsername] = useState("");
  const hardcodedUsername = 'YHU'; 

  const handleTranslation = async () => {
    const translated = await handleTranslate(inputText, hardcodedUsername);
    setTranslatedText(translated);
  };



  useEffect(() => {
    const locaStoragelUsername = localStorage.getItem("username");
    if(locaStoragelUsername){
      setLocalUsername(locaStoragelUsername);
    }
  }, []);


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
    </div>
  );
};

export default TranslationPage;