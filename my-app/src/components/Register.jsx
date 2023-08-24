import './Register.css';
import React, { useState } from "react";
import { RegisterUserApi } from './Api';  

// ... rest of the component code


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 


  function handleRegisterClick(event){
    event.preventDefault();

    RegisterUserApi(username, password)
    .then(newUser => {
      console.log(newUser);
      PopUp("register");
    })
    .catch(error => {
      console.log(error);
      if(error.message === "User already exist!"){

        PopUp("error");
      }else{
        alert("An error occured, Try again")
      }
    })
    
  };

  const PopUp = (messageType) => {
    if(messageType === "register"){
      alert("🎉You are now registered🎉");
    }
    if(messageType === "error"){
      alert("❌You are already registered❌");

    }

  }

  return (
    <div className='register-container'>
      <form>
        <div id="Navigationbar">
           <h1>Lost in Translation</h1>
        </div>
        <hr width="20%" color='black'></hr>
        <h1>Register</h1>
        <hr width="20%" color='black'></hr>
        <br />
        <div>
           <input type="text" placeholder="Register Username..." name="username" className="form-field" value={username} onChange={e => setUsername(e.target.value)}
           /> 
        </div>
        <div>
           <input 
             type="password" placeholder="Register Password..."  className="form-field" name="password" value={password}  onChange={e => setPassword(e.target.value)}
           />
        </div>
        <button className="Button" onClick={handleRegisterClick}>Register</button>
      </form>
    </div>
  );
}

export default Register;
 