import React from "react";
import { Helmet } from "react-helmet";
import PasswordResetForm from "../../../components/pages/auth/password/ResetForm";

const PasswordReset = () => {
  return (
    <>
      <Helmet>
        <title>Reset password</title>
      </Helmet>
      <PasswordResetForm />
    </>
  );
};

export default PasswordReset;
