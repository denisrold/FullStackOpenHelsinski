import axios from "axios";
const baseUrl = "http://localhost:3001/notes";
export const getNotes = () => axios.get(baseUrl).then((res) => res.data);

export const createNote = async (newObject) =>
  await axios.post(baseUrl, newObject).then((res) => res.data);

export const updateNote = async (updatedNote) => {
  await axios
    .put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    .then((res) => res.data);
};
