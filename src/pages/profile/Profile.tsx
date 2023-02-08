import { Container } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import ProfileDetail from '../../components/pages/profile/ProfileDetail';

const Profile = () => {
  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1>Profile</h1>
        <ProfileDetail />
    </Container>
  );
};

// const Profile = () => {
//   return (
//     <ProfileContainer>
//       <Container maxWidth={false}>
//         <Helmet>
//           <title>Profile</title>
//         </Helmet>
//         <h1>Profile</h1>
//         <ProfileDetail />
//       </Container>
//     </ProfileContainer>
//   );
// };

export default Profile;