import { Route, Routes } from "react-router-dom";
import { ProfileLayout } from "../layouts/ProfileLayout";
import NotFound from "../pages/NotFound";
import PersonalInfo from "../pages/profile/PersonalInfo";
import Profile from "../pages/profile/Profile";
import Security from "../pages/profile/Security";

const ProfileRouter = () => {
  return (
    <Routes>
      <Route element={<ProfileLayout />}>
        <Route
          path="/profile"
          element={
            <Profile />
          }
        />
        <Route
          path="/personal-info"
          element={
            <PersonalInfo />
          }
        />
        <Route
          path="/security"
          element={
            <Security />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProfileRouter;
