import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBlogs = async () => {
  const response = await axios.get("http://localhost:3003/api/blogs");
  return response.data;
};

const useFetchBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
};

export default useFetchBlogs;
