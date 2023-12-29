import Axios from "axios";
const BASEURL = "http://localhost:3001";

const getAllMovies = async () => {
  const res = await Axios.get(`${BASEURL}/movies`);
  return res.data;
};

const getMovieById = async (id) => {
  try {
    const res = await Axios.get(`${BASEURL}/movies/${id}`);
    return res.data;
  } catch (error) {
    return undefined;
  }
};

export { getAllMovies, getMovieById };
