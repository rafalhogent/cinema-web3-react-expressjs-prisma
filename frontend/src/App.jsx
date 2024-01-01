import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { getUser } from "./utils/appauth";

const App = () => {
  const navigate = useNavigate();
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true;
      const sessionUser = getUser();
      if (!sessionUser) {
        navigate("/login");
      } else {
        navigate("/overview");
      }
    }
  }, []);

  return <div>Application</div>;
};

export default App;
