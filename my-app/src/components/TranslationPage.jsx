import React, { useState, useEffect} from 'react';

function TranslationPage() {
  const [inputText, setInputText] = useState("");
  const [localUsername, setLocalUsername] = useState("");

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
     
  
  
    </div>
  );
}

export default TranslationPage;