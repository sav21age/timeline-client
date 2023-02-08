import React from "react";
import { Helmet } from "react-helmet";
import PasswordRecoveryForm from "../../../components/pages/auth/password/RecoveryForm";

const PasswordRecovery = () => {
  return (
    <>
      <Helmet>
        <title>Recovery password</title>
      </Helmet>
      <PasswordRecoveryForm />
    </>
  );
};

export default PasswordRecovery;
