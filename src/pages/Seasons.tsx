import { Container } from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { competitionAPI } from "../store/api/competitionApi";
import CompetitionEndpoint from '../endpoints/competitionEndpoint';
import {
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from "./../components/Breadcrumbs";
import Error from './../components/Error';
import SeasonsList from '../components/pages/seasons/SeasonsList';

function Seasons() {
  const { competitionId } = useParams() as { competitionId: string };
  const { data, error, isLoading } = competitionAPI.useFetchByIdQuery(Number(competitionId));
 
  if (error) {
    return <Error />;
  } else if (isLoading) {
    return null;
  } else {
    return (
      <Container maxWidth={false}>
        <Helmet>
          <title>{data?.name}</title>
        </Helmet>

        <BreadcrumbList>
          <BreadcrumbHome />
          <BreadcrumbLink
            name="Competitions"
            url={CompetitionEndpoint.getAll()}
          />
          <BreadcrumbItem name={data?.name} />
        </BreadcrumbList>

        <h1>{data?.name}</h1>
        <SeasonsList competitionId={Number(competitionId)} />
      </Container>
    );
  }
}
export default Seasons;
