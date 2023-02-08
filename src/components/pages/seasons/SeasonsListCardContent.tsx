import {
  CardContent, Divider, Typography
} from "@mui/material";
import React from "react";
import { appConfig } from "../../../appConfig";
import { ISeason } from "../../../models/ISeason";
import { getSeason } from "../../../utils/dates";
import Picture from '../../Picture';
import SeasonsWinnerOrMatchday from "./SeasonsWinnerOrMatchday";

type Props = {
  item: ISeason;
}

const SeasonsListCardContent = ({ item }: Props) => {
  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Season {getSeason(item.startDate, item.endDate)}
        <Typography variant="body2" color="text.secondary">
          <Picture
            path={`${appConfig.MEDIA_ROOT}/flags/${item.competition.area.id}.svg`}
            alt="flag"
            className="flag"
          />{" "}
          {item.competition.area.name}
        </Typography>
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <SeasonsWinnerOrMatchday item={item} />
    </CardContent>
  );
}

export default SeasonsListCardContent;
