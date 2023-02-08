import React from "react";
import { Helmet } from "react-helmet";
import ActivateAccountResendCodeForm from "../../../components/pages/auth/account/ActivateResendCodeForm";

const AccountActivateResendCode = () => {
  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <ActivateAccountResendCodeForm />
    </>
  );
};

export default AccountActivateResendCode;
