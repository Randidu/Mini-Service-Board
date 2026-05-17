import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Jobs ───────────────────────────────────────────────

export const getJobs = async (params = {}) => {
  const { data } = await API.get("/jobs", { params });
  return data;
};

export const getJobById = async (id) => {
  const { data } = await API.get(`/jobs/${id}`);
  return data;
};

export const createJob = async (jobData) => {
  const { data } = await API.post("/jobs", jobData);
  return data;
};

export const updateJobStatus = async (id, status) => {
  const { data } = await API.patch(`/jobs/${id}`, { status });
  return data;
};

export const deleteJob = async (id) => {
  const { data } = await API.delete(`/jobs/${id}`);
  return data;
};

export default API;
