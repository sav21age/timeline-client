import React from "react";
import { Helmet } from "react-helmet";
import SignUpForm from "../../components/pages/auth/SignUpForm";

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <SignUpForm />
    </>
  );
};

export default SignUp;
