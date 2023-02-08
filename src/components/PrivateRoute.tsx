import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import authEndpoint from "../endpoints/authEndpoint"
import { useAppSelector } from "../hooks/redux";

interface Props {
  children: JSX.Element
}

// interface Props {
//   // children: React.ReactNode
//   // children: JSX.Element[] | JSX.Element
//   children: JSX.Element
// }

// export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
// export const PrivateRoute = (children: JSX.Element ) => {
export const PrivateRoute = ({ children }: Props) => {
  const { isAuth } = useAppSelector(state => state.authReducer)
  const { pathname } = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate
      to={`${authEndpoint.signIn()}`}
      state={{ from: pathname }}
      replace
    />
  );
};
