
import axios from 'axios';
const BASE_URL ='http://localhost:3000/songs';

export const getSongs = () => axios.get(BASE_URL);
export const getSongById = (id) => axios.get(`${BASE_URL}/${id}`);
export const addSong = (song) => axios.post(BASE_URL, song);
export const updateSong = (id, song) => axios.put(`${BASE_URL}/${id}`, song);
export const deleteSong = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateSongStatus = (id, newStatus) => {
    return axios.patch(`${BASE_URL}/${id}`, { status: newStatus });
};