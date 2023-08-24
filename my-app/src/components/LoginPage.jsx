import './LoginPage.css';
import React, { useState } from "react"
import { GetUserApi } from './Api';  
import { useNavigate } from 'react-router-dom';


function LoginPage() {

  const [username, setUsername] = useState(""); //{"Value"} fra slides
  const [password, setPassword] = useState(""); //{"Value"} fra slides
  const [fetchedUsername, setFetchedUsername] = useState(""); // Ny state for fetched brugernavn
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  }
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  }

  const nav = useNavigate();

  //When click Register button - usenavigate to /register
  // "page" param - to reuse same method for multiple pages
  const GoToRegister = (page) => {
    return () =>{
      nav(page);
    }
  }
  

  //Get user with api
  function handleLogin(event) {
    event.preventDefault(); //Make sure form html does not interrupt api
    setIsLoading(true); 
    
    GetUserApi(username)
      .then(users => {

        setIsLoading(false);

        console.log(users)
        if (users.length > 0) {
          const user = users[0];

          if(user.password === password){

            setFetchedUsername(user.username);
            
            //Save user in logcal storage - session
            localStorage.setItem("username", user.username);
            
           // GoToRegister("/translation");
            console.log(GoToRegister("/translation"));
            console.log({username} + " logged in🎉")
            alert("🎉You are logged in!🎉");
            nav("/translation"); //Go to translation page
            
            //Redirect to Translation page
          }else{
            alert("❌Wrong password, Try again!❌");
          }
        }else{
          alert("❌User not found - Register User instead!❌");
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });

    console.log("Username: ", username);
    console.log("Password: ", password);
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