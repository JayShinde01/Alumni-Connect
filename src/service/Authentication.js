import axios from "axios";

// Base API URL (replace with your backend API)
const API_URL = "http://localhost:8080";

// Register Alumni
export const registerAlumni = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/registeruser`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // success data from backend
  } catch (error) {
    console.error("Error registering alumni:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};


// 🔹 Login user (alumni / student / admin)
export const logIn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Optionally save token in localStorage
    if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// 🔹 Logout user
export const logOut = () => {
  localStorage.removeItem("authToken");
};

// 🔹 Get current token
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Fetch all Alumni (for directory page)
export const getAlumniList = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};
