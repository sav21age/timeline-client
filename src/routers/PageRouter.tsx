import { Route, Routes, useParams } from "react-router-dom";
import { PageLayout } from '../layouts/PageLayout';
import Club from "../pages/Club";
import Clubs from "../pages/Clubs";
import Competitions from "../pages/Competitions";
import Home from "../pages/Home";
import Match from "../pages/Match";
import Matches from "../pages/Matches";
import NotFound from '../pages/NotFound';
import Seasons from "../pages/Seasons";
import Error from './../components/Error';
import { PrivateRoute } from './../components/PrivateRoute';

const PageRouter = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/club/:clubId" element={
          <PrivateRoute>
            <ValidateClub />
          </PrivateRoute>
        } />
        <Route path="/competition/:competitionId/seasons" element={<ValidateSeasons />} />
        <Route path="/match/:matchId" element={<ValidateMatch />} />
        <Route path="/competition/:competitionId/season/:seasonId/matches"
          element={<ValidateMatches />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRouter;

function ValidateClub() {
  const { clubId } = useParams() as { clubId: string };
  if (!clubId.match(/^[0-9]{1,5}$/)) {
    return <Error />;
  }
  return <Club />;
}

function ValidateSeasons() {
  const { competitionId } = useParams() as { competitionId: string };
  if (!competitionId.match(/^[0-9]{1,5}$/)) {
    return <Error />;
  }
  return <Seasons />;
}

function ValidateMatch() {
  const { matchId } = useParams() as { matchId: string };
  if (!matchId.match(/^[0-9]{4,8}$/)) {
    return <Error />;
  }
  return <Match />;
}

function ValidateMatches() {
  const { competitionId, seasonId } = useParams() as { competitionId: string, seasonId: string };
  if (!competitionId.match(/^[0-9]{1,5}$/) || !seasonId.match(/^[0-9]{1,5}$/)) {
    return <Error />;
  }
  return <Matches />
}