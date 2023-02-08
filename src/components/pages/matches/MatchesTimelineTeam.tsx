import { Link } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";
import ClubEndpoint from "../../../endpoints/clubEndpoint";
import { appConfig } from "../../../appConfig";
import Picture from "../../Picture";
import { IMatch } from "../../../models/IMatch";

function Winner(item: IMatch, flag: string) {
  const homeTeamScore = item.score.fullTime.homeTeam;
  const awayTeamScore = item.score.fullTime.awayTeam;
  const win = "win.main";
  const lose = "lose.main";
  const equal = "equal.main";

  if (flag === "homeTeam") {
    if (homeTeamScore > awayTeamScore) {
      return win;
    } else if (homeTeamScore < awayTeamScore) {
      return lose;
    } else {
      return equal;
    }
  } else if (flag === "awayTeam") {
    if (homeTeamScore < awayTeamScore) {
      return win;
    } else if (homeTeamScore > awayTeamScore) {
      return lose;
    } else {
      return equal;
    }
  }
}

type Props = {
  id: number,
  name: string,
  score: number,
  item: IMatch
  team: string,
}

const MatchesTimelineTeam = (props: Props) => {
  return (
    <TableRow sx={{ backgroundColor: Winner(props.item, props.team) }}>
      <TableCell>
        <Picture
          path={`${appConfig.MEDIA_ROOT}/crests/${props.id}.svg`}
          pathFallback={`${appConfig.MEDIA_ROOT}/crest_none.svg`}
          alt={props.name}
          className="icon icon-float-left"
        />
        <Link
          to={ClubEndpoint.getById(props.id)}
          component={RouterLink}
          color="inherit"
        >
          {props.name}
        </Link>
      </TableCell>
      <TableCell align="right">
        {props.score !== undefined ? props.score : "-"}
      </TableCell>
    </TableRow>
  );
};

export default MatchesTimelineTeam;
