import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { authAPI } from "../../../../store/api/authApi";
import { capitalize } from "../../../../utils/strings";
import { InputField } from "../../../form/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LogoInForm } from "./../LogoInForm";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Entered value does not match email format")
    .required("Required field"),
});

const AccountActivateResendCodeForm = () => {
  const [email, setEmail] = useState("");

  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [AccountActivateResendCode, { isLoading }] =
    authAPI.useLazyAccountActivateResendCodeQuery();

  const { handleSubmit, control } = useForm({
    mode: "onSubmit",
    defaultValues: { email: email },
    resolver: yupResolver(schema),
  });

  async function onSubmit() {
    try {
      const res = await AccountActivateResendCode({ email }).unwrap();
      if (res) {
        setEmailHasBeenSent(true);
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
          <CardHeader
            title="Resend activation code"
            sx={{ paddingBottom: 0 }}
          />
          <CardContent>
            {!emailHasBeenSent ? (
              <>
                {serverErrorMessage ? (
                  <Alert severity="error">
                    {capitalize(serverErrorMessage)}
                  </Alert>
                ) : (
                  ""
                )}

                <InputField
                  setOnEvent={setEmail}
                  autoComplete="email"
                  control={control}
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
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
              </>
            ) : (
              <>
                <Alert severity="success">
                  <AlertTitle>Email hes been sent</AlertTitle>
                  Please check your email and click{" "}
                  <strong>activate account</strong> in the message.
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

export default AccountActivateResendCodeForm;
