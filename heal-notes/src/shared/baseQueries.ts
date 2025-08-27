import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET
export const getData = async <T>(
  endpoint: string,
  params?: object
): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(endpoint, { params });
  return response.data;
};

// POST
export const postData = async <T>(
  endpoint: string,
  data: object,
  params?: object
): Promise<T> => {
  const response: AxiosResponse<T> = await api.post(endpoint, data, { params });
  return response.data;
};

// PATCH
export const patchData = async <T>(
  endpoint: string,
  data: object,
  params?: object
): Promise<T> => {
  const response: AxiosResponse<T> = await api.patch(endpoint, data, {
    params,
  });
  return response.data;
};

// DELETE
export const deleteData = async <T>(
  endpoint: string,
  data: object,
  params?: object
): Promise<T> => {
  const response: AxiosResponse<T> = await api.delete(endpoint, { params });
  return response.data;
};
