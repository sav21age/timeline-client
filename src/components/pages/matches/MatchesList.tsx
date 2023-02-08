import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Empty from "../../Empty";
import { useFilterClub } from "../../../hooks/useFilterClub";
import { isEmptyArray } from "../../../utils/isEmpty";
import { useAppSelector } from "../../../hooks/redux";
import { useObserver } from "../../../hooks/useObserver";
import AutocompleteClub from "./AutocompleteClub";
import MatchesTimelineTable from "./MatchesTimelineTable";
import SelectMatchStatus from "./SelectMatchStatus";
import { SelectMatchdayDate } from "./SelectMatchdayDate";
import useDatination from "./hooks/useDatination";
import { useFilterMatchStatus } from "./hooks/useFilterMatchStatus";
import { useFilterMatchday } from "./hooks/useFilterMatchday";
import { IMatch } from "../../../models/IMatch";
import { IClub } from "../../../models/IClub";

type Props = {
  mData: IMatch[],
  mDate: string[],
  cData: IClub[],
}

function MatchesList({ mData, mDate, cData }: Props) {
  const state = useAppSelector((state) => state.matchReducer);

  const handleNextPage = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const perPage = 5;

  let mDATA = useFilterMatchday(useFilterMatchStatus(mData));
  mDATA = useFilterClub(mDATA, state.clubId);

  const _mDATA = useDatination(mDATA, perPage);

  useEffect(() => {
    setPage(1);
  }, [state.matchStatus, state.clubId, state.matchdayDate]);

  useObserver(handleNextPage, page, _mDATA.maxPage, () => {
    setPage(page + 1);
    _mDATA.jump(page);
  });


  return (
    <>
      <Box sx={{ mt: 3 }}>
        <SelectMatchStatus data={mData} />
        <SelectMatchdayDate date={mDate} data={mData} mDATA={mDATA} />
        <AutocompleteClub data={cData} />
      </Box>

      {!isEmptyArray(_mDATA.currentData()) ? (
        <>
          <Timeline sx={{ mt: 0, pt: 0 }}>
            {_mDATA.currentData().map((item, index, data) => {
              return (
                <React.Fragment key={item.id}>
                  {timelineDate(item, index, data)}
                  <TimelineItem>
                    {timelineMatchday(item, index, data)}
                    <TimelineSeparator>
                      <TimelineDot variant="outlined" color="primary" />
                      <TimelineConnector color="primary" />
                    </TimelineSeparator>
                    <TimelineContent>
                      <MatchesTimelineTable
                        item={item}
                        country={item.competition.area.name}
                        className="timeline-competition-table"
                      />
                    </TimelineContent>
                  </TimelineItem>
                </React.Fragment>
              );
            })}
          </Timeline>
        </>
      ) : (
        <Empty />
      )}
      <div ref={handleNextPage} />
    </>
  );
}

export default MatchesList;

const timelineDate = (item: any, index: number, data: any) => {
  let prevDate = null;
  if (index > 0) {
    prevDate = new Date(data[index - 1].utcDate).toLocaleDateString();
  }

  if (prevDate !== new Date(item.utcDate).toLocaleDateString()) {
    return (
      <Typography variant="h6" component="span" sx={{ py: "20px" }}>
        {new Date(Date.parse(item.utcDate)).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Typography>
    );
  }
};

const timelineMatchday = (item: IMatch, index: number, data: IMatch[]) => {
  let prevMatchdayDate = null;
  let prevMatchday = null;

  if (index > 0) {
    prevMatchdayDate = new Date(data[index - 1].utcDate).toLocaleDateString();
    prevMatchday = data[index - 1].matchday;
  }

  if (
    prevMatchday !== item.matchday ||
    prevMatchdayDate !== new Date(item.utcDate).toLocaleDateString()
  ) {
    return (
      <TimelineOppositeContent color="text.secondary">
        <Typography sx={{ fontSize: "0.875rem" }}>
          Matchday {item.matchday}
        </Typography>
      </TimelineOppositeContent>
    );
  }
};
