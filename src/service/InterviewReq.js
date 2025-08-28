import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // adjust if needed


export const getAllRequests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getallrequests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all requests:", error);
    throw error;
  }
};

export const getRequestsByStudent = async (studentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getbystudent/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching requests for student ${studentId}:`, error);
    throw error;
  }
};


export const getRequestsByAlumni = async (alumniId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getbyalumni/${alumniId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching requests for alumni ${alumniId}:`, error);
    throw error;
  }
};


export const createRequest = async (requestData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createreq`, requestData);
    return response.data;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};


export const updateRequestStatus = async (reqId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updatestatus/${reqId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating status for request ${reqId}:`, error);
    throw error;
  }
};


export const rescheduleRequest = async (reqId, scheduleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reschedule/${reqId}`, scheduleData);
    return response.data;
  } catch (error) {
    console.error(`Error rescheduling request ${reqId}:`, error);
    throw error;
  }
};


export const deleteRequest = async (reqId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${reqId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting request ${reqId}:`, error);
    throw error;
  }
};
