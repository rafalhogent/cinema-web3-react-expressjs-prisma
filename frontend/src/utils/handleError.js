const handleError = (isError, error, navigate) => {
  if (isError) {
    if (error.code === "ERR_NETWORK") {
      const err = new Error("Service unavaible");
      err.status = 503;
      throw err;
    }
    if (error.response?.status === 401) {
      return navigate("/login");
    }
  }
};

export { handleError };
