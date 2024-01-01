import Axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

const getAllMovies = async () => {
  try {
    const res = await Axios.get(`${backend_url}/movies`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log('catched-error', error.response.status);
  }
};

const getMovieById = async (id) => {
  try {
    const res = await Axios.get(`${backend_url}/movies/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log('catched-error', error.response.status);
  }
};

export { getAllMovies, getMovieById };
