import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://idp-backend-production-5cb5.up.railway.app";

const api = axios.create({
  baseURL: API_URL,
});

export const uploadFile = async (
  file,
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
      onUploadProgress,
    }
  );

  return response.data;
};

export const extractDocument = async (
  file,
  onUploadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/extract",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
      onUploadProgress,
    }
  );

  return response.data;
};

export const askQuestion = async (
  question
) => {
  const response = await api.post(
    "/chat",
    {
      question,
    }
  );

  return response.data;
};

export default api;