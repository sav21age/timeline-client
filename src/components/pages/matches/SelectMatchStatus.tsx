import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IMatch } from "../../../models/IMatch";
import { matchSlice } from "../../../store/slice/matchSlice";

const SelectMatchStatus = ({ data }: { data: IMatch[] }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.matchReducer);

  const defaultOptions = [
    { value: "SHOW_ALL", name: "Show all" },
    { value: "CANCELED", name: "Canceled" },
    { value: "FINISHED", name: "Finished" },
    { value: "IN_PLAY", name: "In play" },
    { value: "LIVE", name: "Live" },
    { value: "PAUSED", name: "Paused" },
    { value: "POSTPONED", name: "Postponed" },
    { value: "SCHEDULED", name: "Scheduled" },
    { value: "SUSPENDED", name: "Suspended" },
  ];

  useEffect(() => {
    return () => {
      dispatch(matchSlice.actions.setMatchStatus("SHOW_ALL"));
    }
  }, []) // eslint-disable-line

  const options = useMemo(() => {
    let mStatus = [...new Set(data.map((item) => item.status))];
    mStatus.unshift("SHOW_ALL");
    return defaultOptions.filter((item) => mStatus.includes(item.value));
  }, []); // eslint-disable-line

  const handleChange = (event: any) => {
    dispatch(matchSlice.actions.setMatchStatus(event.target.value));
  };

  if (options.length > 2) {
    return (
      <FormControl
        sx={{ minWidth: 150 }}
        size="small"
        margin="dense"
      >
        <InputLabel>Match status</InputLabel>
        <Select
          value={state.matchStatus}
          label="Match status"
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else {
    return null
  }
};

export default SelectMatchStatus;
