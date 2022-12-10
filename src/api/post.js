export const posting = async ({
  username,
  photoSrc,
  videoSrc,
  description,
} = {}) => {
  const post = {
    username,
    photoSrc,
    videoSrc,
    description,
  };

  try {
    const res = await fetch(`http://localhost:8080/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot Post at this time. ${err}`);
  }
};

// READ Students
export const getPosts = async () => {
  try {
    const res = await fetch(`http://localhost:8080/getPosts`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};

// READ Students
export const getOnePost = async ({ username }) => {
  try {
    const res = await fetch(`http://localhost:8080/getOnePost/${username}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};
