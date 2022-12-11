export const registerOrg = async ({
  username,
  email,
  password,
  profession,
  points,
  status,
  hobl,
  displaypicture,
} = {}) => {
  const organization = {
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
    const res = await fetch(`http://localhost:8080/registerOrg`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(organization),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot register at this time. ${err}`);
  }
};
export const loginOrg = async ({ email, password } = {}) => {
  const organization = { email, password };

  try {
    const res = await fetch(`http://localhost:8080/loginOrg`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(organization),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot login at this time. ${err}`);
  }
};

export const logoutOrg = async () => {
  try {
    const res = await fetch(`http://localhost:8080/logoutOrg`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getOrg = async () => {
  try {
    const res = await fetch(`http://localhost:8080/organization`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

// READ Students
export const getOneOrg = async ({ username }) => {
  try {
    const res = await fetch(`http://localhost:8080/sendOrg/${username}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

export const addFollowing = async ({ username, friendorganizationname }) => {
  try {
    const res = await fetch(
      `http://localhost:8080/addFollowing/${username}/${friendorganizationname}`,
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

export const followEvents = async ({ username, eventname }) => {
  try {
    const res = await fetch(
      `http://localhost:8080/followEvents/${username}/${eventname}`,
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

export const sendInvite = async ({ friendorganizationname, eventname }) => {
  try {
    const res = await fetch(
      `http://localhost:8080/sendInvite/${friendorganizationname}/${eventname}`,
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
