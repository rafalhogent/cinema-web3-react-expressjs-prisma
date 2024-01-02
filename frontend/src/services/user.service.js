import Axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

const userService = {
  login: async (credentials) => {
    return await Axios.post(`${backend_url}/users/login`, credentials, {
      withCredentials: true,
    });
  },
  logout: async () => {
    await Axios.delete(`${backend_url}/users/logout`, {
      withCredentials: true,
    });
  },
  register: async (credentials) => {
    const res = await Axios.post(`${backend_url}/users/register`, credentials, {
      withCredentials: true,
    })
  return res
  }
};

export { userService };
