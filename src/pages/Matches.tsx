import { Container } from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import {
  BreadcrumbHome, BreadcrumbItem, BreadcrumbLink, BreadcrumbList
} from "../components/Breadcrumbs";
import Error from "../components/Error";
// import { Loading } from "../components/Loading";
import CompetitionEndpoint from "../endpoints/competitionEndpoint";
import SeasonEndpoint from "../endpoints/seasonEndpoint";
import { seasonAPI } from "../store/api/seasonApi";
import { getSeason } from "../utils/dates";
import ScrollTop from './../components/ScrollTop';
import MatchesDataLayer from './../components/pages/matches/MatchesDataLayer';

const Matches = () => {
  const { competitionId, seasonId } = useParams() as { competitionId: string, seasonId: string };
  const { data, error, isLoading } = seasonAPI.useFetchByIdQuery(Number(seasonId));

  if (error) {
    return <Error />;
  } else if (isLoading) {
    return null;
  } else {
    return (
      <>
        <Container maxWidth={false}>
          <Helmet>
            <title>
              {data?.competition.name} Season{" "}
              {getSeason(data?.startDate, data?.endDate)}
            </title>
          </Helmet>
          <BreadcrumbList>
            <BreadcrumbHome />
            <BreadcrumbLink
              name="Competitions"
              url={CompetitionEndpoint.getAll()}
            />
            <BreadcrumbLink
              name={data?.competition.name}
              url={SeasonEndpoint.getAll(Number(competitionId))}
            />
            <BreadcrumbItem
              name={"Season " + getSeason(data?.startDate, data?.endDate)}
            />
          </BreadcrumbList>
          <h1>
            {data?.competition.name} {getSeason(data?.startDate, data?.endDate)}
          </h1>
          <MatchesDataLayer
            competitionId={Number(competitionId)}
            seasonId={Number(seasonId)}
          />
        </Container>
        <ScrollTop showBelow={350} />
      </>
    );
  }
};
export default Matches;
