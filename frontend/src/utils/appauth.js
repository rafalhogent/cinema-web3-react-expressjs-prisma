const setupUser = (user) => {
  localStorage.setItem("appuser", JSON.stringify(user));
};

const getUser = () => {
//   return localStorage.getItem("appuser");
return JSON.parse(localStorage.getItem('appuser')) ;
};

const clearStorage = () => {
  return localStorage.clear();
};

export { setupUser, getUser, clearStorage };
