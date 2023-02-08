import {
  Card,
  CardActionArea,
  Grid,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import MatchEndpoint from '../../../endpoints/matchEndpoint';
import { ISeason } from "../../../models/ISeason";
import { seasonAPI } from "../../../store/api/seasonApi";
import Error from "../../Error";
import { LoadingLayer } from '../../LoadingLayer';
import SeasonsListCardContent from "./SeasonsListCardContent";

type Props = {
  competitionId: number;
}

const SeasonsList = ({ competitionId }: Props) => {
  const [page, setPage] = useState(1);
  const perPage = 9;

  const [Seasons, { data, error, isLoading }] = seasonAPI.useLazyFetchAllQuery();

  let totalCount = 1
  if (data?.xTotalCount) {
    totalCount = data?.xTotalCount
  }
  const maxPage = Math.ceil(totalCount / perPage)

  useEffect(() => {
    Seasons({
      competitionId: competitionId,
      params: { page: page, per_page: perPage }
    })
  }, [page])// eslint-disable-line

  const handleChange = (event: any, page: number) => {
    setPage(page);
  };

  if (error) {
    return <Error />;
  } else {
    return (
      <>
        {maxPage === 1 ? (
          <></>
        ) : (
          <>
            <Pagination
              sx={{ marginBottom: "10px" }}
              count={maxPage}
              page={page}
              onChange={handleChange}
              color="primary"
              boundaryCount={0}
            />
          </>
        )}
        <LoadingLayer isLoading={isLoading}>
          <Grid container spacing={1}>
            {data?.seasons.map((item: ISeason) => {
              return (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  {item.available ? (
                    <Card variant="outlined">
                      <CardActionArea
                        component={RouterLink}
                        to={MatchEndpoint.getAll(competitionId, item.id)}
                      >
                        <SeasonsListCardContent item={item} />
                      </CardActionArea>
                    </Card>
                  ) : (
                    <Card variant="outlined">
                      <CardActionArea sx={{ backgroundColor: "lose.main" }}>
                        <SeasonsListCardContent item={item} />
                      </CardActionArea>
                    </Card>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </LoadingLayer>
      </>
    );
  }
}

export default SeasonsList;
