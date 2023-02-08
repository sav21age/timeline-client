import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { AuthLayout } from '../layouts/AuthLayout';
import NotFound from '../pages/NotFound';
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import AccountActivate from "../pages/auth/account/Activate";
import AccountActivateResendCode from "../pages/auth/account/ActivateResendCode";
import PasswordRecovery from "../pages/auth/password/Recovery";
import PasswordReset from "../pages/auth/password/Reset";
import Error from './../components/Error';

const AuthRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/sign-in" element={
          <SignIn />} />

        <Route path="/account/activate/:code" element={
          <AccountActivate />} />

        <Route path="/account/activate/resend" element={
          <AccountActivateResendCode />} />

        <Route path="/password/recovery" element={<PasswordRecovery />} />

        <Route path="/password/reset/:code" element={<ValidatePasswordReset />} />

      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function ValidatePasswordReset() {
  const { code } = useParams() as { code: string };
  if (!code.match(/^[a-z0-9]{32}$/)) {
    return <Error />;
  }
  return <PasswordReset />;
}

export default AuthRouter;
