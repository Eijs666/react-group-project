

//201 Create User - Post a user to json server
export const RegisterUserApi = (username, password) => {
  return fetch(`${apiURL}/users`, {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      username: username, 
      password: password,
      translations: [] 
    })
  })
  .then(response => {
    return response.json().then(data => ({
      ok: response.ok,
      status: response.status,
      body: data
    }));
  })
  .then(result => {
    if (!result.ok) {
      // Assuming 409 Conflict is the status code for duplicate user
      if (result.status === 409) {
        throw new Error('User already exists');
      } else {
        throw new Error('Can not create user');
      }
    }
    return result.body;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
};


//Get user - use this function when user login - Get user info
export const GetUserApi = (username) => {
  return fetch(`${apiURL}/users?username=${username}`, {
    method: 'GET',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Can not fetch user');
    }
    return response.json();
  })
  .catch(error => {
    console.error(error);
  });
};