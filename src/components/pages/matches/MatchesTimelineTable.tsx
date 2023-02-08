import { Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";
import { capitalize } from "../../../utils/strings";
import MatchesTimelineTeam from "./MatchesTimelineTeam";
import { IMatch } from "../../../models/IMatch";

type Props = {
  item: IMatch,
  country: string,
  className: string
}

const MatchesTimelineTable = (props: Props) => {
  return (
    <Table className={props.className} size="small">
      <TableBody>
        <MatchesTimelineTeam
          id={props.item.homeTeam.id}
          name={props.item.homeTeam.name}
          score={props.item.score.fullTime.homeTeam}
          item={props.item}
          team="homeTeam"
        />
        <MatchesTimelineTeam
          id={props.item.awayTeam.id}
          name={props.item.awayTeam.name}
          score={props.item.score.fullTime.awayTeam}
          item={props.item}
          team="awayTeam"
        />
        <TableRow>
          <TableCell colSpan={2} sx={{ fontSize: "75%" }}>
            <div>
              Status: {capitalize(props.item.status)}
              {props.item.status === "FINISHED" ? (
                <span>
                  ,{" "}
                  <Link
                    to={`/match/${props.item.id}`}
                    component={RouterLink}
                    color="inherit"
                  >
                    Match stats
                  </Link>
                </span>
              ) : (
                ""
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default MatchesTimelineTable;
