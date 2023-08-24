
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
    <div>
      <h2>Translation Page</h2>
      <div>Welcome, {localUsername}</div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button onClick={handleTranslation}>Translate</button>
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
