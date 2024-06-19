import axios from "axios";
import { useState, useEffect } from "react";
export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getResources = async () => {
    const response = await axios.get(baseUrl).then((res) => res.data);
    setResources([...response]);
  };
  useEffect(() => {
    getResources();
  }, []);
  // ...

  const create = async (resource) => {
    const response = await axios
      .post(baseUrl, resource)
      .then((res) => res.data);
    setResources([...resources, response]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
