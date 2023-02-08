import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import { authAPI } from "../../../../store/api/authApi";
import { capitalize } from "../../../../utils/strings";
import { InputField } from "../../../form/InputField";
import AuthService from "./../../../../endpoints/authEndpoint";
import { LogoInForm } from "./../LogoInForm";

const schema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .required("Required field")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[A-Za-z0-9]+$/,
      "Entered value does not match email or username format"
    ),
});

const PasswordRecoveryForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [PasswordRecovery, { isLoading }] =
    authAPI.useLazyPasswordRecoveryQuery();

  const {
    handleSubmit,
    control,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: usernameOrEmail,
    },
    resolver: yupResolver(schema),
  });

  async function onSubmit() {
    try {
      const res = await PasswordRecovery({ usernameOrEmail }).unwrap();
      if (res) {
        setCheckEmail(true);
      }
    } catch (e) {
      setServerErrorMessage(e.data.message);
    }
  }

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
          <CardHeader title="Password recovery" sx={{ paddingBottom: 0 }} />
          <CardContent>
            {!checkEmail ? (
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
                  setOnEvent={setUsernameOrEmail}
                  autoComplete="email"
                  control={control}
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  label="Username or email"
                  value={usernameOrEmail}
                />

                {/* <Button type="submit" fullWidth variant="contained">
                  Send
                </Button> */}

                <LoadingButton
                  type="submit"
                  fullWidth
                  loading={isLoading}
                  variant="contained"
                  sx={{ marginTop: 2 }}
                >
                  Send
                </LoadingButton>

                <Grid
                  container
                  spacing={1}
                  sx={{ marginTop: 1 }}
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <Typography variant="body2">
                      Remembered password?{" "}
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
                  Please check your email and click{" "}
                  <strong>reset password</strong> in the message.
                </Alert>
                <Button
                  component={RouterLink}
                  to="/"
                  variant="contained"
                  sx={{ marginTop: 2 }}
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

export default PasswordRecoveryForm;
