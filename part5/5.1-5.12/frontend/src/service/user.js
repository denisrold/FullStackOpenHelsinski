import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";
let token = "";
const setToken = (tokenConfig) => {
  token = `Bearer ${tokenConfig}`;
};
//if need the userId for something on frontend.
const userId = async () => {
  const config = { headers: { Authorization: token } };
  const response = await axios.get(`${baseUrl}/userId`, config);
  return response.data;
};

export default { setToken, userId };
