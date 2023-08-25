const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const handleTranslate = async (inputText, localUsername) => {
  try {
    const response = await fetch(`${apiURL}/translations?username=${localUsername}`, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: localUsername,
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


export const FetchLastTenTranslations = (username) => {
  // Fetch the user based on the username
  return GetUserApi(username)
    .then(users => {
      const user = Array.isArray(users) ? users[0] : users;
      if (!user || !user.translations) throw new Error('User or translations not found');

      // Get the last 10 translations
      const lastTenTranslations = user.translations.slice(-10);

      console.log("Last 10 translations:", lastTenTranslations);
      return lastTenTranslations;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};


//Funtion to get users data - then PATCH to empty
export const handleClearTranslations = async (localusername) => {
  try {
    const userResponse = await fetch(`${apiURL}/translations?username=${localusername}`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      const user = userData.find(user => user.username === localusername);

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


//Create/register User - POST a user to json server
export const RegisterUserApi = (username, password) => {
  // Tjek først om brugeren allerede eksisterer
  return GetUserApi(username)
    .then(user => {
      //user exist? Error!
      if (user && user.username === username) {
        throw new Error('User already exists');
      }
      //User dont exist? Create user!
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
      });
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
        // If dupllicate user, then give error
        if (result.status === 409) {
          throw new Error('User already exists');
        } else {
          throw new Error('Cannot create user');
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
        // Hvis response ikke er OK, forsøg at få JSON-data for at vise en mere detaljeret fejl
        return response.json().then(data => {
          throw new Error(data.message || 'Can not fetch user');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Get response: ", data);
      return data;
    })
    //Catch error to understand what fails
    .catch(error => {
      console.error(error);
      throw error;
    });
};




// Store translations to users
export const PutUserTranslation = (username, translation) => {
  // First, fetch the user based on the username
  return GetUserApi(username)
    .then(users => {
      const user = Array.isArray(users) ? users[0] : users;
      if (!user || !user.id) throw new Error('User not found');

      const updatedTranslations = [...user.translations, translation];
      //Add new translation to the user's translations

      // Now, update the user in the database with the new translation list
      return fetch(`${apiURL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...user, translations: updatedTranslations })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Could not save translation for user');
          }
          return response.json();
        });
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};


// Store translations to users
/*
[
  {
        "id": 1,
        "username": "dewaldels",
        "translations": [
            "hello world",
            "react is fun"
        ]
    }
]
*/

