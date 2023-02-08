import { Box, Typography } from "@mui/material";
import { appConfig } from "../../../appConfig";
import { ISeason } from "../../../models/ISeason";
import Picture from "../../Picture";

type Props = {
  item: ISeason;
}

const SeasonsWinnerOrMatchday = ({ item }: Props) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 15,
      }}
    >
      {!item.winner ? (
        <>
          <Picture
            path={`${appConfig.MEDIA_ROOT}/ball.svg`}
            alt=""
            className="flag"
          />
          <Typography sx={{ ml: 1 }} component="span">
            Matchday {item.currentMatchday}
          </Typography>
        </>
      ) : (
        <>
          <Picture
            path={`${appConfig.MEDIA_ROOT}/crests/${item.winner.crest}`}
            alt=""
            className="flag"
          />
          <Typography sx={{ ml: 1 }} component="span">
            {item.winner.name}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default SeasonsWinnerOrMatchday;
