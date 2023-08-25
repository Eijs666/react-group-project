import './LoginPage.css';
import React, { useState } from "react"
import { GetUserApi } from './Api';
import { useNavigate } from 'react-router-dom';
import TranslationPage from './TranslationPage';
import Register from './Register';
import { useEffect } from 'react';


function LoginPage() {

  const [username, setUsername] = useState(""); //{"Value"} from slides
  const [password, setPassword] = useState(""); //{"Value"} from slides
  const [fetchedUsername, setFetchedUsername] = useState(""); // New state for fetched brugernavn
  const [isLoading, setIsLoading] = useState(false); // Loadin state for logging in

  //Handle user input - username / password
  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  }
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  }

  //To navigate around pages
  const nav = useNavigate();

  //When click Register button - usenavigate to /register
  // "page" parameter - to reuse same method for multiple pages
  const GoToRegister = (page) => {
    return () => {
      nav(page);
    }
  }

  //Check if a session is already running
  const SessionChecker = () => {
    const username = localStorage.getItem("username");

    //User not exist - go to homepage - else go to translation page
    if (!username) {
      console.log("No user found - no session - create user");

    } else {
      nav("/translation");
      console.log("Sesssion is running. User: " + { username });
    }

  }

  // Run once mounted 
  useEffect(() => {
    SessionChecker();
  }, []);


  //Get user with api calls
  function handleLogin(event) {
    event.preventDefault(); //Make sure form html does not interrupt api
    setIsLoading(true);

    GetUserApi(username)
      .then(users => {

        setIsLoading(false); //Loading symbol not dispalyed

        //Get first user foound
        if (users.length > 0) {
          const user = users[0];

          if (user.password === password) {

            setFetchedUsername(user.username);

            //Save user in logcal storage - session
            localStorage.setItem("username", user.username);

            // GoToRegister("/translation");
            console.log({ username } + " logged in🎉")
            nav("/translation"); //Go to translation page

            //Redirect to Translation page
          } else {
            alert("❌Wrong password, Try again!❌");
          }
        } else {
          alert("❌User not found - Register user instead!❌");
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });

  }

  return (


    <div className='login-container'>

      <div id="Navigationbar">
        <h1>Lost in Translation</h1>
      </div>


      <form className='input-field'>
        <hr width="20%" color='black'></hr>

        <h1>Home Page</h1>
        {fetchedUsername && <h1>{fetchedUsername}</h1>}

        <hr width="20%" color='black'></hr>

        <div>
          <input type="text" name="username" placeholder='Username' className="form-field" value={username} onChange={handleUsernameInput}></input>
        </div>

        <div>
          <input type="text" placeholder='Password' name="password" className="form-field" value={password} onChange={handlePasswordInput}></input>
        </div>

        <button onClick={handleLogin} className='Button'>
          {isLoading ? (
            <div className="lds-dual-ring"></div> // Show spinner when loading
          ) : (
            "Login" // Show "Login" text when not loading
          )}
        </button>
      </form>



      <hr width="20%" color='black'></hr>
      <button className='Button' onClick={GoToRegister("/register")}>Register</button>

    </div>

  );
}

export default LoginPage