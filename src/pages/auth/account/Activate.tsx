import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { authAPI } from "../../../store/api/authApi";
import { capitalize } from "../../../utils/strings";

const AccountActivate = () => {

  const { code } = useParams() as { code: string };

  const [accountActivated, setAccountActivated] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const [accountActivate] = authAPI.useLazyAccountActivateQuery();

  const onLoad = async () => {
    try {
      const res = await accountActivate(code).unwrap();
      if (res) {
        setAccountActivated(true);
      }
    } catch (e: any) {
      setServerErrorMessage(e.data.message);
    }
  };

  useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line

  return (
    <>
      <Helmet>
        <title>Activate account</title>
      </Helmet>
      {accountActivated ? (
        <Alert severity="success">Account activated!</Alert>
      ) : (
        <Alert severity="error">
          {capitalize(serverErrorMessage)}
        </Alert>
      )}
    </>
  );
};

// const ActivateAccount = () => {
//   const params = useParams();
//   const classes = useStyles();

//   const [accountActivated, setAccountActivated] = useState(false);
//   const [serverErrorMessage, setServerErrorMessage] = useState("");

//   const checkAuth = async () => {
//     const response = await AuthService.ActivateAccount(params.code);
//     if (response.ok) {
//       setAccountActivated(true);
//     } else {
//       setServerErrorMessage(response.data.message);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>Activate account</title>
//       </Helmet>
//       <AuthContainer>
//         {accountActivated ? (
//           <Alert severity="success">Account activated!</Alert>
//         ) : (
//           <Alert severity="error" className={classes.alert}>
//             {capitalize(serverErrorMessage)}
//           </Alert>
//         )}
//       </AuthContainer>
//     </>
//   );
// };

export default AccountActivate;
