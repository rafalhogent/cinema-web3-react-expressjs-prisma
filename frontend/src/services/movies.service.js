import Axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

const getAllMovies = async () => {
  const res = await Axios.get(`${backend_url}/movies`, {
    withCredentials: true,
  });
  return res.data;
};

const getMovieById = async (id) => {
  const res = await Axios.get(`${backend_url}/movies/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export { getAllMovies, getMovieById };
