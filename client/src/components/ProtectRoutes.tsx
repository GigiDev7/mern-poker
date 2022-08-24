import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IUserState } from "../reducers/authReducer";

interface IProp {
  children: React.ReactNode;
}

const ProtectRoutes: React.FC<IProp> = ({ children }) => {
  const { user } = useSelector((state: { auth: IUserState }) => state.auth);

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return <div>{children}</div>;
};

export default ProtectRoutes;
