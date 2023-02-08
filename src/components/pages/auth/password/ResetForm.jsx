import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import { authAPI } from "../../../../store/api/authApi";
import { capitalize } from "../../../../utils/strings";
import { PasswordField } from "../../../form/PasswordField";
import { Loading } from "./../../../Loading";
import { LogoInForm } from "./../LogoInForm";

export const schema = yup.object().shape({
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

const PasswordResetForm = () => {
  const params = useParams();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { handleSubmit, control } = useForm({
    mode: "onSubmit",
    defaultValues: {
      password: password,
      repeatPassword: repeatPassword,
    },
    resolver: yupResolver(schema),
  });

  // const codeRef = useRef();

  const [verifyCode, setVerifyCode] = useState(true);
  const [onLoadIsLoading, setOnLoadIsLoading] = useState(true);

  const [PasswordRecoveryCodeVerify] =
    authAPI.useLazyPasswordRecoveryCodeVerifyQuery();

  const onLoad = async () => {
    setOnLoadIsLoading(true);
    try {
      await PasswordRecoveryCodeVerify(params.code).unwrap();
    } catch (e) {
      setVerifyCode(false);
    } finally {
      setOnLoadIsLoading(false);
    }
  };

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line

  const [passwordIsSet, setPasswordIsSet] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [setNewPassword, { isLoading }] = authAPI.useLazySetNewPasswordQuery();

  async function onSubmit() {
    try {
      // const code = codeRef.current.value;
      const code = params.code;
      const res = await setNewPassword({ password, code }).unwrap();
      if (res) {
        setPasswordIsSet(true);
      }
    } catch (e) {
      setServerErrorMessage(e?.data?.message);
    }
  }

  if (onLoadIsLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {!verifyCode ? (
          <Alert severity="error">Code is invalid!</Alert>
        ) : (
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
                  title="Set new password"
                  sx={{ paddingBottom: 0 }}
                />
                <CardContent>
                  {!passwordIsSet ? (
                    <>
                      {serverErrorMessage ? (
                        <Alert severity="error">
                          {capitalize(serverErrorMessage)}
                        </Alert>
                      ) : (
                        ""
                      )}

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

                      {/* <input
                        id="code"
                        name="code"
                        type="hidden"
                        ref={codeRef}
                      /> */}

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
        )}
      </>
    );
  }
};
export default PasswordResetForm;
