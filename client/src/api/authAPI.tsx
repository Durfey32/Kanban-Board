import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
    // TODO: make a POST request to the login route
  try {
    const respone = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!respone.ok) {
      const errorData = await respone.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await respone.json();

    return data;
  } catch (error) {
    console.log('Error from user login', error);
    return Promise.reject('Could not fetch user info')
  }
};



export { login };
