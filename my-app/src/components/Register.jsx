import './Register.css';
import React, { useState } from "react";
import { GetUserApi, RegisterUserApi } from './Api';  
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 

  //So we can navigate around the pages
  const nav = useNavigate();

  //Register user 
  //User exist? dont create! - user dont exist? Create!
  function handleRegisterClick(event){
    event.preventDefault(); 
    
    //Check if the user already exists
     GetUserApi(username)
      .then(existingUser => {
        if (existingUser && existingUser.username === username) {
          PopUp("error");
        } else {
          //User dont exist - then create user
          return RegisterUserApi(username, password);
        }
      })
      .then(newUser => {
        if (newUser) {
          console.log(newUser);
          PopUp("register");
        }
      })
      .catch(error => {
        console.log(error);
        if (error.message === "User already exists") {
          PopUp("error");
        } else {
          alert("An error occurred. Please try again.");
        }
      });

  };

  //Pop alerts
  const PopUp = (messageType) => {
    if(messageType === "register"){
      alert("🎉You are now registered - Try and log on!🎉");
    }
    if(messageType === "error"){
      alert("❌You are already registered❌");

    }

  }
  
  //Check if session is running aka. is user logged on?
  const SessionChecker = () => {
    const username = localStorage.getItem("username");
  
    //User not exist ? go to homepage - else go to translation page
    if(!username){
      //nav("/register"); //Stay on register page
      console.log("No user found - no session - create user");

      }else{
      nav("/translation");
      console.log("Sesssion is running. User: " + {username});
      }
  
    }
    
    //run check session function
    useEffect(() => {
      SessionChecker();
    }, []);
  

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
 