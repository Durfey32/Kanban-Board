import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const respones = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!respones.ok) {
      const errorData = await respones.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await respones.json();

    return data;
  } catch (error) {
    console.log('Error from user login', error);
    return Promise.reject('Could not fetch user info')
  }

  // TODO: make a POST request to the login route
}



export { login };
