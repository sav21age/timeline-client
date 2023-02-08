import {
  Table, TableBody, TableCell, TableHead, TableRow, Typography
} from "@mui/material";
import { appConfig } from "../../appConfig";
import Picture from "../../components/Picture";
import { IMatchDetail } from "../../models/IMatchDetail";
import { styles } from "../../styles/styles";
import { getDate, getSeason } from "../../utils/dates";
import { capitalize } from "../../utils/strings";

type Props = {
  data: IMatchDetail;
}

const MatchDetail = ({ data }: Props) => {
  return (
    <div>
      <h3>Score</h3>
      <Table aria-label="simple table" className="stat">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Half time</TableCell>
            <TableCell>Full Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              <Picture
                path={`${appConfig.MEDIA_ROOT}/crests/${data.homeTeam.id}.svg`}
                alt={data.homeTeam.name}
                className="icon icon-float-left"
              />
              {data.homeTeam.name}
            </TableCell>
            <TableCell>{data.score.halfTime.homeTeam}</TableCell>
            <TableCell>{data.score.fullTime.homeTeam}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Picture
                path={`${appConfig.MEDIA_ROOT}/crests/${data.awayTeam.id}.svg`}
                alt={data.awayTeam.name}
                className="icon icon-float-left"
              />
              {data.awayTeam.name}
            </TableCell>
            <TableCell>{data.score.halfTime.awayTeam}</TableCell>
            <TableCell>{data.score.fullTime.awayTeam}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>Data</h3>

      <Table aria-label="simple table" className="stat">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: "50%" }}>
              <Typography sx={styles.Caption}>
                Date
              </Typography>
            </TableCell>
            <TableCell>{getDate(data.utcDate)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography sx={styles.Caption}>
                Matchday
              </Typography>
            </TableCell>
            <TableCell>{data.matchday}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography sx={styles.Caption}>
                Status
              </Typography>
            </TableCell>
            <TableCell>{capitalize(data.status)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography sx={styles.Caption}>
                Competition
              </Typography>
            </TableCell>
            <TableCell>{data.competition.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography sx={styles.Caption}>
                Country
              </Typography>
            </TableCell>
            <TableCell>{data.competition.area.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography sx={styles.Caption}>
                Season
              </Typography>
            </TableCell>
            <TableCell>
              {getSeason(data.season.startDate, data.season.endDate)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography sx={styles.Caption}>
                Venue
              </Typography>
            </TableCell>
            <TableCell>{data.venue}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>Head 2 head</h3>

      <Table aria-label="simple table" className="stat">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Draws</TableCell>
            <TableCell>Losses</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{data.head2head.homeTeam.name}</TableCell>
            <TableCell>{data.head2head.homeTeam.wins}</TableCell>
            <TableCell>{data.head2head.homeTeam.draws}</TableCell>
            <TableCell>{data.head2head.homeTeam.losses}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{data.head2head.awayTeam.name}</TableCell>
            <TableCell>{data.head2head.awayTeam.wins}</TableCell>
            <TableCell>{data.head2head.awayTeam.draws}</TableCell>
            <TableCell>{data.head2head.awayTeam.losses}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h4>Total</h4>

      <Table aria-label="simple table" className="stat">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: { xs: "50%", sm: "30%" } }}>
              <Typography sx={styles.Caption}>
                Number of matches
              </Typography>
            </TableCell>
            <TableCell align="center">
              {data.head2head.numberOfMatches}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography sx={styles.Caption}>
                Total goals
              </Typography>
            </TableCell>
            <TableCell align="center">{data.head2head.totalGoals}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
// };

export default MatchDetail;
