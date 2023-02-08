import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { capitalize } from "../../../utils/strings";
import AuthService from "./../../../endpoints/authEndpoint";
import { authAPI } from "./../../../store/api/authApi";
import { InputField } from "../../form/InputField";
import { PasswordField } from "../../form/PasswordField";
import { LogoInForm } from "./LogoInForm";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Required field")
    .matches(/^[A-Za-z0-9]+$/i, "Entered value does not match username format"),
  email: yup
    .string()
    .required("Required field")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Entered value does not match email format"
    ),
  password: yup
    .string()
    .required("Required field")
    .min(6, "min length is 6")
    .max(32, "max length is 32"),
  repeatPassword: yup
    .string()
    .required("Please repeat your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [successSignUp, setSuccessSignUp] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [signUpUser, { isLoading }] = authAPI.useLazySignUpQuery();

  const { handleSubmit, control } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      username: username,
      email: email,
      password: password,
      repeatPassword: repeatPassword,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
      const data = await signUpUser({ username, email, password }).unwrap();

      if (data) {
        setSuccessSignUp(true);
      }
    } catch (e) {
      setServerErrorMessage(e.data.message);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ width: "100%" }}
      >
        <LogoInForm />
        <Card>
          <CardHeader title="Sign Up" sx={{ paddingBottom: 0 }} />
          <CardContent>
            {!successSignUp ? (
              <>
                {serverErrorMessage ? (
                  <Alert severity="error">
                    {capitalize(serverErrorMessage)}
                  </Alert>
                ) : (
                  ""
                )}

                <InputField
                  autoFocus
                  setOnEvent={setUsername}
                  autoComplete="username"
                  control={control}
                  id="username"
                  name="username"
                  label="Username"
                  value={username}
                />

                <InputField
                  setOnEvent={setEmail}
                  autoComplete="email"
                  control={control}
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                />

                <PasswordField
                  setOnEvent={setPassword}
                  autoComplete="off"
                  control={control}
                  id="password"
                  name="password"
                  label="Password"
                  value={password}
                />

                <PasswordField
                  setOnEvent={setRepeatPassword}
                  autoComplete="off"
                  control={control}
                  id="repeatPassword"
                  name="repeatPassword"
                  label="Repeat password"
                  value={repeatPassword}
                />

                {/* <Button type="submit" fullWidth variant="contained">
                  Sign Up
                </Button> */}

                <LoadingButton
                  type="submit"
                  fullWidth
                  // size="small"
                  // color="secondary"
                  // onClick={handleClick}
                  loading={isLoading}
                  // loadingPosition="start"
                  variant="contained"
                  sx={{ marginTop: 2 }}
                >
                  Sign Up
                </LoadingButton>

                <Grid
                  container
                  spacing={1}
                  sx={{ marginTop: 1 }}
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <Typography variant="body2">
                      Already have an account?{" "}
                      <Link
                        component={RouterLink}
                        to={`${AuthService.signIn()}`}
                        variant="body2"
                      >
                        Sign In
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Alert severity="success">
                  <AlertTitle>Thanks for signing up!</AlertTitle>
                  Please check your email and click{" "}
                  <strong>activate account</strong> in the message.
                </Alert>
                <Button
                  component={RouterLink}
                  to="/"
                  sx={{ marginTop: 1 }}
                  // fullWidth
                  variant="contained"
                >
                  Got it
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default SignUpForm;
