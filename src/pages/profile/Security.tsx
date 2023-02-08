import { Container } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import SecurityDetail from '../../components/pages/profile/SecurityDetail';

const Security = () => {
  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Security</title>
      </Helmet>
      <h1>Security</h1>
      <SecurityDetail />
    </Container>
  );
};

// const Security = () => {
//   return (
//     <ProfileContainer>
//       <Container maxWidth={false}>
//         <Helmet>
//           <title>Security</title>
//         </Helmet>
//         <h1>Security</h1>
//         <SecurityDetail />
//       </Container>
//     </ProfileContainer>
//   );
// };

export default Security;
