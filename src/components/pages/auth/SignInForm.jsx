import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import AuthService from "../../../endpoints/authEndpoint";
import { useAppDispatch } from "../../../hooks/redux";
import { authAPI } from "../../../store/api/authApi";
import { authSlice } from "../../../store/slice/authSlice";
import { InputField } from "../../form/InputField";
import { PasswordField } from "../../form/PasswordField";
import { LogoInForm } from "./LogoInForm";

const schema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .required("Required field")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[A-Za-z0-9]+$/,
      "Entered value does not match email or username format"
    ),
  password: yup
    .string()
    .required("Required field")
    .min(6, "min length is 6")
    .max(32, "max length is 32"),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { state: location } = useLocation();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [accountActivated, setAccountActivated] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [signInUser, { isLoading }] = authAPI.useLazySignInQuery();

  const {
    handleSubmit,
    control,
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: { usernameOrEmail: usernameOrEmail, password: password },
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
      const data = await signInUser({
        usernameOrEmail,
        password,
        rememberMe,
      }).unwrap();

      if (data) {
        dispatch(authSlice.actions.setAccessToken(data.accessToken));
        dispatch(authSlice.actions.setIsAuth(true));
        dispatch(authSlice.actions.setData(data.user));
        if (location){
          navigate(location.from);
        } else {
          navigate("/");
        }
      }
    } catch (e) {
      if (e.status === 423) {
        setAccountActivated(false);
      } else {
        setServerErrorMessage(e.data.message);
      }
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
          <CardHeader title="Sign In" sx={{ paddingBottom: 0 }} />
          <CardContent>
            {accountActivated ? (
              <>
                {serverErrorMessage ? (
                  <Alert severity="error">{serverErrorMessage}</Alert>
                ) : (
                  ""
                )}

                <InputField
                  autoFocus
                  setOnEvent={setUsernameOrEmail}
                  autoComplete="email"
                  control={control}
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  label="Username or email"
                  value={usernameOrEmail}
                />

                <PasswordField
                  setOnEvent={setPassword}
                  autoComplete="current-password"
                  control={control}
                  id="password"
                  name="password"
                  label="Password"
                  value={password}
                />

                <FormControlLabel
                  control={<Checkbox checked={rememberMe} color="primary" />}
                  label="Remember me"
                />

                {/* <Button type="submit" fullWidth variant="contained">
                  Sign In
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
                >
                  Sign In
                </LoadingButton>

                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                  <Grid item xs>
                    <Typography variant="body2">
                      <Link
                        component={RouterLink}
                        to={`${AuthService.passwordRecovery()}`}
                        variant="body2"
                      >
                        Forgot password?
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Don't have an account?{" "}
                      <Link
                        component={RouterLink}
                        to={`${AuthService.signUp()}`}
                        variant="body2"
                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Alert severity="error">
                  <AlertTitle>Account not activated</AlertTitle>
                  <Typography variant="body2">
                    Please check your email and click{" "}
                    <strong>activate account</strong> in the message.
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Didn't receive email message?{" "}
                    <Link
                      component={RouterLink}
                      to={`${AuthService.accountActivateResendCode()}`}
                      variant="body2"
                    >
                      Resend activation code
                    </Link>
                    .
                  </Typography>
                </Alert>
                <Button
                  component={RouterLink}
                  to="/"
                  // fullWidth
                  variant="contained"
                  sx={{ marginTop: 1 }}
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

export default SignInForm;
