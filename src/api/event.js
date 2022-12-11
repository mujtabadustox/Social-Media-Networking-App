export const uploadEvent = async ({
  username,
  eventname,
  photoSrc,
  datePosted,
  startDate,
  endDate,
  description,
  stars,
  type,
  location,
} = {}) => {
  const event = {
    username,
    eventname,
    photoSrc,
    datePosted,
    startDate,
    endDate,
    description,
    stars,
    type,
    location,
  };

  try {
    const res = await fetch(`http://localhost:8080/uploadEvent`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot Post at this time. ${err}`);
  }
};

export const getEvents = async () => {
  try {
    const res = await fetch(`http://localhost:8080/getEvents`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

export const getOneEvent = async ({ username }) => {
  try {
    const res = await fetch(`http://localhost:8080/getOneEvent/${username}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

export const getOneEventLoc = async ({ location }) => {
  try {
    const res = await fetch(
      `http://localhost:8080/getOneEventLoc/${location}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

export const getOneEventTp = async ({ type }) => {
  try {
    const res = await fetch(`http://localhost:8080/getOneEventTp/${type}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

export const getOneEventEn = async ({ eventname }) => {
  try {
    const res = await fetch(
      `http://localhost:8080/getOneEventEn/${eventname}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};
