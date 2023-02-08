import { Box, Container, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import Error from "../components/Error";
import { Loading } from "../components/Loading";
import {
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./../components/Breadcrumbs";
import { appConfig } from "../appConfig";
import Picture from "../components/Picture";
import ClubEndpoint from '../endpoints/clubEndpoint';
import { clubAPI } from "../store/api/clubApi";
import { getShortDate } from "../utils/dates";
import { isEmptyArray, isEmptyObject } from "../utils/isEmpty";
import { IClubDetail } from './../models/IClubDetail';

const Club = () => {
  const { clubId } = useParams() as { clubId: string };
  const { data, error, isLoading } = clubAPI.useFetchByIdQuery(Number(clubId));

  if (error) {
    return <Error />;
  } else if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Container maxWidth={false}>
        <Helmet>
          <title>{data?.name}</title>
        </Helmet>
        <BreadcrumbList>
          <BreadcrumbHome />
          <BreadcrumbLink name="Clubs" url={ClubEndpoint.getAll()} />
          <BreadcrumbItem name={data?.name} />
        </BreadcrumbList>
        <h1>{data?.name}</h1>

        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Picture
                path={`${appConfig.MEDIA_ROOT}/crests/${data?.crest}`}
                pathFallback={`${appConfig.MEDIA_ROOT}/crest_none.svg`}
                alt={data?.name !== undefined ? data.name : {} as string}
                height="250px"
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell width="20%">Name</TableCell>
                    <TableCell>
                      <strong>{data?.name}</strong> ({data?.shortName})
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Founded</TableCell>
                    <TableCell>{data?.founded ? data?.founded : "-"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Area</TableCell>
                    <TableCell>{data?.area.name ? data?.area.name : "-"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Venue</TableCell>
                    <TableCell>{data?.venue ? data?.venue : "-"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{data?.address ? data?.address : "-"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Website</TableCell>
                    <TableCell>
                      {data?.website ? (
                        <Link href={data?.website}>{data?.website}</Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>

        {!isEmptyArray(data?.runningCompetitions !== undefined ? data.runningCompetitions : {} as []) ? (
          <>
            <h3>Competitions</h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Emblem</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data?.runningCompetitions.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Picture
                            path={`${appConfig.MEDIA_ROOT}/competitions/${item.emblem}`}
                            pathFallback={`${appConfig.MEDIA_ROOT}/cup_gray.svg`}
                            alt={item.name}
                            height="40"
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </>
        ) : (
          <></>
        )}

        {!isEmptyObject(data?.coach !== undefined ? data.coach : {} as IClubDetail) ? (
          <>
            <h3>Coach</h3>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {data?.coach.name ? data?.coach.name : "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                        Nationality
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {data?.coach.nationality ? data?.coach.nationality : "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                        Date of birth
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {data?.coach.dateOfBirth
                        ? getShortDate(data?.coach.dateOfBirth)
                        : "-"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <></>
        )}

        {!isEmptyArray(data?.squad !== undefined ? data.squad : {} as []) ? (
          <>
            <h3>Squad</h3>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ maxHeight: 450 }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      Nationality
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      Date of birth
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data?.squad.map((item) => {
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.position}</TableCell>
                          <TableCell
                            sx={{ display: { xs: "none", sm: "table-cell" } }}
                          >
                            {item.nationality}
                          </TableCell>
                          <TableCell
                            sx={{ display: { xs: "none", sm: "table-cell" } }}
                          >
                            {getShortDate(item.dateOfBirth)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <></>
        )}

      </Container>
    );
  }
};

export default Club;
