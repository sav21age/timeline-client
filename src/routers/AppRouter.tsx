import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import PageRouter from "./PageRouter";
import ProfileRouter from "./ProfileRouter";
import { PrivateRoute } from "../components/PrivateRoute";
import Refresh from '../components/Refresh';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={
        <Refresh>
          <PageRouter />
        </Refresh >
      } />
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route
        path="/user/*"
        element={
          <Refresh>
            <PrivateRoute>
              <ProfileRouter />
            </PrivateRoute>
          </Refresh>
        }
      />
    </Routes>
  );
};

export default AppRouter;
