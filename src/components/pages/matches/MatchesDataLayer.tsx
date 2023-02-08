import Error from "../../Error";
import { Loading } from "../../Loading";
import { clubAPI } from "../../../store/api/clubApi";
import { matchAPI } from "../../../store/api/matchApi";
import MatchesList from "./MatchesList";
import { IMatch } from "../../../models/IMatch";
import { IClub } from "../../../models/IClub";

const MatchesDataLayer = ({ competitionId, seasonId }: { competitionId: number, seasonId: number }) => {
  const {
    data: mData,
    error: mDataError,
    isLoading: mDataIsLoading,
  } = matchAPI.useFetchAllQuery({ competitionId, seasonId });

  const {
    data: mDate,
    error: mDateError,
    isLoading: mDateIsLoading,
  } = matchAPI.useFetchAllDatesQuery({ competitionId, seasonId });

  const {
    data: cData,
    error: cDataError,
    isLoading: cDataIsLoading,
  } = clubAPI.useFetchBySeasonIdQuery(seasonId);

  if (mDataError || mDateError || cDataError) {
    return <Error />;
  } else if (mDataIsLoading || mDateIsLoading || cDataIsLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {/* <MatchesList mData={mData} mDate={mDate} cData={cData} /> */}
        <MatchesList
          mData={mData !== undefined ? mData : {} as IMatch[]}
          mDate={mDate !== undefined ? mDate : {} as string[]}
          cData={cData !== undefined ? cData : {} as IClub[]} />
      </>
    );
  }
};
export default MatchesDataLayer;
