import ClearIcon from "@mui/icons-material/Clear";
import { FormControl, IconButton, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { matchSlice } from "../../../store/slice/matchSlice";
import { subtractTimeZoneOffset } from "../../../utils/dates";
import { isEmptyArray } from "../../../utils/isEmpty";

const styles = {
  ClearButtonHide: {
    visibility: "hidden",
  },
  ClearButtonShow: {
    visibility: "visible",
  },
};

// type Props = {
//   date: string[],
//   data: IMatch[],
//   mDATA: IMatch[],
// }

export function SelectMatchdayDate({ date, data, mDATA }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.matchReducer);
  const [value, setValue] = useState(Date.now);
  const [dateAccepted, setDateAccepted] = useState(false);

  const [clearButtonShow, setClearButtonShow] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(matchSlice.actions.setMatchdayDate(""));
      dispatch(matchSlice.actions.setMatchdayDateDisabled(false));
    };
  }, []); // eslint-disable-line

  const mDATE = useMemo(() => {
    if (state.matchStatus !== "SHOW_ALL") {
      let tmp = data.filter((item) => item.status === state.matchStatus);
      tmp = [...new Set(tmp.map((item) => item.utcDate))];
      return tmp.map((date) => new Date(date));
    } else {
      return date.map((date) => new Date(date));
    }
  }, [mDATA]); // eslint-disable-line

  const [minDate, maxDate] = useMemo(() => {
    if (!isEmptyArray(mDATE)) {
      const minDate = Math.min(...mDATE);
      const maxDate = Math.max(...mDATE);
      if (!dateAccepted) {
        setValue(minDate);
      }
      return [minDate, maxDate];
    }
  }, [mDATE]); // eslint-disable-line

  const handleChange = (date, event) => {
    setValue(date);
  };

  const handleAccept = (date, event) => {
    setDateAccepted(true);
    setClearButtonShow(true);
    dispatch(matchSlice.actions.setMatchdayDate(date));
    dispatch(matchSlice.actions.setClubDisabled(true));
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setDateAccepted(false);
    setValue(minDate);
    dispatch(matchSlice.actions.setMatchdayDate(""));
    dispatch(matchSlice.actions.setClubDisabled(false));
    setClearButtonShow(false);
  };

  const disabledDates = (date) => {
    return !mDATE
      .map((date) => date.toISOString().substring(0, 10))
      .includes(subtractTimeZoneOffset(date).toISOString().substring(0, 10));
  };

  return (
    <FormControl margin="dense" size="small">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Matchday date"
          inputFormat="dd/MM/yyyy"
          clearable
          value={value}
          onChange={handleChange}
          onAccept={handleAccept}
          renderInput={(params) => <TextField {...params} />}
          minDate={minDate}
          disabled={state.matchdayDateDisabled ? true : false}
          maxDate={maxDate}
          shouldDisableDate={disabledDates}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={
                  clearButtonShow
                    ? styles.ClearButtonShow
                    : styles.ClearButtonHide
                }
                size="small"
                onClick={handleClear}
                title="Clear"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
            style: {
              height: 40,
              width: 150,
            },
          }}
          // components={{
          //   ActionBar: CustomActionBar,
          // }}
          // componentsProps={{
          //   actions: ["clear", "cancel", "accept"],
          // }}
          // componentsProps={{
          //   actionBar: {
          //     actions: ["clear", "cancel", "accept"],
          //   },
          // }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

// const CustomActionBar = (props) => {
//   const onReset = () => {
//     props.onCancel();
//   };

//   return (
//     <DialogActions>
//       <Button onClick={onReset}>Reset</Button>
//       <Button onClick={props.onCancel}>Cancel</Button>
//       <Button onClick={props.onAccept}>Ok</Button>
//     </DialogActions>
//   );
// };
