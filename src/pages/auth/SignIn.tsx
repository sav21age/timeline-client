import React from "react";
import { Helmet } from "react-helmet";
import SignInForm from "../../components/pages/auth/SignInForm";

const SignIn = () => {
  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <SignInForm />
    </>
  );
};

export default SignIn;
