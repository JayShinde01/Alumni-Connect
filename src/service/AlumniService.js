import axios from "axios";

const API_URL = "http://localhost:8080/api/alumni";

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Get All Alumni
export const getAllAlumni = async () => {
  try {
    console.log("above  get all alumni...");
    const token = localStorage.getItem("token");
    console.log(token);
    
    const response = await axios.get(`${API_URL}/getall`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    
  });
  console.log("Request headers sent:", response.config.headers);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching alumni:", error);
    throw error;
  }
};

// Get Alumni by ID
export const getAlumniById = async (id) => {
  try {
    console.log(id);
    
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching alumni by ID:", error);
    throw error;
  }
};

// Delete Alumni by ID
export const deleteAlumni = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error deleting alumni:", error);
    throw error;
  }
};
// Update Alumni by id
export const updateAlumni = async (id, updated) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updated, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error updating alumni:", error);
    throw error;
  }
};

