import { Container } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import PersonalInfoDetail from '../../components/pages/profile/PersonalInfoDetail';

const PersonalInfo = () => {
  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Personal information</title>
      </Helmet>
      <h1>Personal information</h1>
      <PersonalInfoDetail />
    </Container>
  );
};

// const PersonalInfo = () => {
//   return (
//     <ProfileContainer>
//       <Container maxWidth={false}>
//         <Helmet>
//           <title>Personal information</title>
//         </Helmet>
//         <h1>Personal information</h1>
//         <PersonalInfoDetail />
//       </Container>
//     </ProfileContainer>
//   );
// };

export default PersonalInfo;
