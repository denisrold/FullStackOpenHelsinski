import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const createNew = async (content) => {
  try {
    const object = { content, important: false };
    const response = await axios.post(baseUrl, object);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const toggleImportance = async (id) => {
  try {
    const notes = await getAll();
    const oneNote = notes.find((n) => n.id === id);
    const object = { ...oneNote, important: !oneNote.important };
    const response = await axios.put(baseUrl + `/${id}`, object);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export default { getAll, createNew, toggleImportance };
