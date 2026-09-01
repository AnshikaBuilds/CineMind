import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// --------------------------------------------------
// AUTH HEADERS
// --------------------------------------------------

export const getAuthHeaders = async (getToken) => {
  if (typeof getToken !== "function") {
    throw new Error("Clerk getToken function was not provided.");
  }

  const token = await getToken();

  if (!token) {
    throw new Error("Clerk authentication token is missing.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// --------------------------------------------------
// CREATE PROJECT
// --------------------------------------------------

export const createProject = async (project, getToken) => {
  const headers = await getAuthHeaders(getToken);

  return API.post("/projects/", project, {
    headers,
  });
};

// --------------------------------------------------
// GET ALL PROJECTS
// --------------------------------------------------

export const getProjects = async (getToken) => {
  const headers = await getAuthHeaders(getToken);

  return API.get("/projects/", {
    headers,
  });
};

// --------------------------------------------------
// GET ONE PROJECT
// --------------------------------------------------

export const getProject = async (id, getToken) => {
  const headers = await getAuthHeaders(getToken);

  return API.get(`/projects/${id}`, {
    headers,
  });
};

// --------------------------------------------------
// GENERATE MOVIE STREAM
// --------------------------------------------------

export const generateMovieStream = async (id, getToken) => {
  const headers = await getAuthHeaders(getToken);

  const response = await fetch(
    `http://127.0.0.1:8000/projects/${id}/generate-stream`,
    {
      method: "GET",
      headers: {
        ...headers,
        Accept: "text/event-stream",
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Movie generation failed (${response.status}): ${errorText}`,
    );
  }

  if (!response.body) {
    throw new Error("Streaming response body is unavailable.");
  }

  return response;
};
