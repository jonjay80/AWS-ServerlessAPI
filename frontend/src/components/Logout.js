import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { resetUserSession } from "service/AuthService";

const Logout = () => {
  useEffect(() => {
    resetUserSession();
  }, []);

  return <Redirect to="/login" />;
};

export default Logout;
