import { Container } from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import {
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from "../components/Breadcrumbs";
import Error from "../components/Error";
import { Loading } from "../components/Loading";
import { getSeason } from "../utils/dates";
import { getDate } from "./../utils/dates";
import MatchDetail from "../components/pages/MatchDetail";
import { IMatchDetail } from "../models/IMatchDetail";
import { matchAPI } from "../store/api/matchApi";
import CompetitionEndpoint from '../endpoints/competitionEndpoint';
import MatchEndpoint from '../endpoints/matchEndpoint';
import SeasonEndpoint from '../endpoints/seasonEndpoint';

const Match = () => {
  const { matchId } = useParams() as { matchId: string };
  const { data, error, isLoading } = matchAPI.useFetchByIdQuery(Number(matchId));

  if (error) {
    return <Error />;
  } else if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Container maxWidth={false}>
        <Helmet>
          <title>
            {data?.competition.name} Season{" "}
            {getSeason(data?.season.startDate, data?.season.endDate)}{" "}
            {data?.homeTeam.name} - {data?.awayTeam.name} {getDate(data?.utcDate)}{" "}
            Match Stats
          </title>
        </Helmet>

        <BreadcrumbList>
          <BreadcrumbHome />

          <BreadcrumbLink
            name="Competitions"
            url={CompetitionEndpoint.getAll()}
          />

          <BreadcrumbLink
            name={data?.competition.name + " Season"}
            url={SeasonEndpoint.getAll(Number(data?.competition.id))}
          />

          <BreadcrumbLink
            name={
              "Season " + getSeason(data?.season.startDate, data?.season.endDate)
            }
            url={MatchEndpoint.getAll(Number(data?.competition.id), Number(data?.season.id))}
          />
          <BreadcrumbItem name="Match Stats" />
        </BreadcrumbList>

        <h1>
          {data?.homeTeam.name} - {data?.awayTeam.name} Match Stats
        </h1>

        <MatchDetail data={data !== undefined ? data : {} as IMatchDetail} />
      </Container>
    );
  }
};
export default Match;
