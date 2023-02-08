import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { appConfig } from "../appConfig";
import Error from "../components/Error";
import { Loading } from "../components/Loading";
import Picture from "../components/Picture";
import seasonEndpoint from "../endpoints/seasonEndpoint";
import usePagination from "../hooks/usePagination";
import { ICompetition } from "../models/ICompetition";
import { competitionAPI } from "../store/api/competitionApi";
import { styles } from "../styles/styles";
import {
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbList,
} from "./../components/Breadcrumbs";

const Competitions = () => {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data, error, isLoading } = competitionAPI.useFetchAllQuery();

  const _DATA = usePagination(data !== undefined ? data : {} as ICompetition[], perPage);

  const handleChange = (event: any, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

  if (error) {
    return <Error />;
  } else if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Container maxWidth={false}>
        <Helmet>
          <title>Competitions</title>
        </Helmet>
        <BreadcrumbList>
          <BreadcrumbHome />
          <BreadcrumbItem name="Competitions" />
        </BreadcrumbList>
        <h1>Competitions</h1>
        {_DATA.maxPage === 1 ? (
          <></>
        ) : (
          <>
            <Pagination
              sx={{ marginBottom: "20px" }}
              count={_DATA.maxPage}
              page={page}
              onChange={handleChange}
              color="primary"
              boundaryCount={0}
            />
          </>
        )}
        <Grid container spacing={2}>
          {_DATA &&
            _DATA
              .currentData()
              .filter((item: any) =>
                appConfig.availableCompetitions.includes(item.code)
              )
              .map((item: any) => {
                return (
                  <Grid item key={item.id} xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={styles.Card}>
                      {/* <Card variant="outlined"> */}
                      <CardActionArea
                        component={RouterLink}
                        to={seasonEndpoint.getAll(item.id)}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={`${appConfig.MEDIA_ROOT}/competitions/${item.emblem}`}
                          alt={item.name}
                          // onError={(e) => (e.target.src = appConfig.FALLBACK_SRC)}
                          sx={styles.CardMedia}
                        />
                        <Picture
                          path={`${appConfig.MEDIA_ROOT}/flags/${item.area.id}.svg`}
                          alt="flag"
                          className="flag"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                            <Typography variant="body2" color="text.secondary">
                              {item.area.name}
                            </Typography>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      </Container>
    );
  }
};

export default Competitions;