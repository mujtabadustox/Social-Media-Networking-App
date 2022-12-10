export const register = async ({
  username,
  email,
  password,
  profession,
  points,
  status,
  hobl,
  displaypicture,
} = {}) => {
  const user = {
    username,
    email,
    password,
    profession,
    points,
    status,
    hobl,
    displaypicture,
  };

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

// READ Students
export const getUsers = async () => {
  try {
    const res = await fetch(`http://localhost:8080/send`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

// READ Students
export const getOneUser = async ({ username }) => {
  try {
    const res = await fetch(`http://localhost:8080/sendUser/${username}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

export const addFriends = async ({ username, friendusername }) => {
  try {
    const res = await fetch(
      `http://localhost:8080/addFriends/${username}/${friendusername}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    return await res.json();
  } catch (err) {
    throw new Error("Error Adding");
  }
};
