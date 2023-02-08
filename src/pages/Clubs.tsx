import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { appConfig } from "../appConfig";
import {
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbList,
} from "../components/Breadcrumbs";
import Error from "../components/Error";
import { LoadingLayer } from "../components/LoadingLayer";
import Picture from "../components/Picture";
import AutocompleteArea from '../components/pages/clubs/AutocompleteArea';
import SelectPerPage from "../components/pages/clubs/SelectPerPageClubs";
import SelectSortByClubs from "../components/pages/clubs/SelectSortByClubs";
import ClubEndpoint from "../endpoints/clubEndpoint";
import { useAppSelector } from "../hooks/redux";
import { clubAPI } from "../store/api/clubApi";
import { styles } from "../styles/styles";

const Clubs = () => {
  const [page, setPage] = useState(1);

  const { perPage, sortBy, areaId } = useAppSelector((state) => state.clubReducer);

  const [fetchClubs, { data, error, isFetching }] = clubAPI.useLazyFetchAllQuery();

  let totalCount = 1
  if (data?.xTotalCount) {
    totalCount = data?.xTotalCount
  }

  const maxPage = Math.ceil(totalCount / perPage)

  const params: any = {
    page: page,
    per_page: perPage,
  }
  if (sortBy) {
    params.sort_by = sortBy
  }
  if (areaId) {
    params.area_id = areaId
  }

  useEffect(() => {
    fetchClubs(params)
  }, [page])// eslint-disable-line

  useEffect(() => {
    if (page !== 1) {
      setPage(1)
    } else {
      fetchClubs({ ...params, page: 1 })
    }
  }, [perPage, sortBy, areaId])// eslint-disable-line

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  if (error) {
    return <Error />;
  } else {
    return (
      <Container maxWidth={false}>
        <Helmet>
          <title>Clubs</title>
        </Helmet>
        <BreadcrumbList>
          <BreadcrumbHome />
          <BreadcrumbItem name="Clubs" />
        </BreadcrumbList>
        <h1>Clubs</h1>
        <Box sx={{ justify: "space-between", mt: 3 }}>
          <AutocompleteArea />
          <SelectPerPage />
          <SelectSortByClubs />
        </Box>

        <Pagination
          sx={styles.Pagination}
          count={maxPage}
          page={page}
          onChange={handleChange}
          color="primary"
          disabled={isFetching ? true : false}
        />
        <LoadingLayer isLoading={isFetching}>
          <Grid container spacing={1}>
            {data?.clubs.map((item: any) => {
              return (
                <Grid item key={item.id} xs={6} sm={6} md={2}>
                  <Card variant="outlined" sx={styles.Card}>
                    <CardActionArea
                      component={RouterLink}
                      to={ClubEndpoint.getById(item.id)}
                    >
                      <CardMedia
                        component="img"
                        height="120"
                        image={`${appConfig.MEDIA_ROOT}/crests/${item.crest}`}
                        alt={item.name}
                        // onError={(e) => (e.target.src = appConfig.FALLBACK_SRC)}
                        onError={(e) => ((e.target as HTMLSourceElement).src = `${appConfig.MEDIA_ROOT}/crest_none.svg`)}
                        sx={styles.CardMedia}
                      />
                      <Picture
                        path={`${appConfig.MEDIA_ROOT}/flags/${item.area.id}.svg`}
                        alt=""
                        className="flag"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
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
        </LoadingLayer>
      </Container>
    );
  }
};

export default Clubs;