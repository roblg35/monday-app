import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getAllFragrances = async () => {
  const response = await axios.get(`${BASE_URL}/fragrances`);
  return response.data;
};

export const getFragranceById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/fragrances/${id}`);
  return response.data;
};

export const addFragrance = async (fragrance: any) => {
  const response = await axios.post(`${BASE_URL}/fragrances`, fragrance);
  return response.data;
};

export const updateFragrance = async (id: string, fragrance: any) => {
  const response = await axios.put(`${BASE_URL}/fragrances/${id}`, fragrance);
  return response.data;
};

export const deleteFragrance = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/fragrances/${id}`);
  return response.data;
};
