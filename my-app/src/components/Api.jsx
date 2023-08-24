



export const handleTranslate = async (inputText, hardcodedUsername) => {
  try {
    const response = await fetch(`${apiURL}/translations?username=${hardcodedUsername}`, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: hardcodedUsername,
        translations: [inputText],
      }),
    });

    if (response.ok) {
      const translatedData = await response.json();
      return translatedData.translations[0];
    } else {
      console.error('Translation failed');
      return '';
    }
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
};

export const fetchLastTenTranslations = async (userName) => {
  try {
    const response = await fetch(`${apiURL}/translations?username=${userName}`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      const lastTenTranslations = userData[0]?.translations.slice(-10);
      return lastTenTranslations || [];
    } else {
      console.error('Error fetching translations:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching user translations:', error);
    return [];
  }
};

export const handleClearTranslations = async (userName) => {
  try {
    const userResponse = await fetch(`${apiURL}/translations?username=${userName}`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      const user = userData.find(user => user.username === userName);
      
      if (user) {
        const userId = user.id;
        const clearResponse = await fetch(`${apiURL}/translations/${userId}`, {
          method: 'PATCH', 
          headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            translations: [],
          }),
        });

        if (clearResponse.ok) {
          return [];
        } else {
          console.error('Error clearing translations:', clearResponse.status);
          return [];
        }
      }
    } else {
      console.error('Error fetching user:', userResponse.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error clearing translations:', error);
    return [];
  }
};




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