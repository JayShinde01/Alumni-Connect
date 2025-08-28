import axios from "axios";

// Base API URL (replace with your backend API)
const API_URL = "http://localhost:8080";

// 🔹 Register Alumni
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/registeruser`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering alumni:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// 🔹 Login user (alumni / student / admin)
export const logIn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data?.token) {
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("name", response.data.name);
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// 🔹 Logout user (pass navigate from component)
// 🔹 Logout user
export const logOut = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  localStorage.removeItem("id");
  navigate("/login");
};


// 🔹 Get current token
export const getToken = () => localStorage.getItem("token");

// 🔹 Fetch all Alumni (for directory page)
export const getAlumniList = async () => {
  try {
    const response = await axios.get(`${API_URL}/alumni`); // update endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};
