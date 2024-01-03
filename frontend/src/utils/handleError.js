const handleError = (isError, error, navigate) => {
  if (isError) {
    if (error.code === "ERR_NETWORK") {
      const err = new Error("Service unavaible");
      err.status = 503;
      throw err;
    }
    if ([401, 403].includes(error.response?.status)) {
      return navigate("/login");
    }
  }
};

export { handleError };
