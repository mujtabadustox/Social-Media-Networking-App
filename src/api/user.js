export const register = async ({
  username,
  email,
  password,
  profession,
} = {}) => {
  const user = { username, email, password, profession };

  try {
    const res = await fetch(`http://localhost:8080/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot register at this time. ${err}`);
  }
};

export const login = async ({ email, password } = {}) => {
  const user = { email, password };

  try {
    const res = await fetch(`http://localhost:8080/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot login at this time. ${err}`);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`http://localhost:8080/logout`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const res = await fetch(`http://localhost:8080/user`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};
