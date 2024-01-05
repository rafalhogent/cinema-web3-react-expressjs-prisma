import Axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

const getUserTickets = async () => {
  const res = await Axios.get(`${backend_url}/tickets`, {
    withCredentials: true,
  });
  return res.data;
};

const buyTickets = async (tickets) => {
  const res = await Axios.post(`${backend_url}/tickets`,  tickets,{
    withCredentials: true,
  });
  return res.data;
};

export { getUserTickets, buyTickets };
