import FormControl from "@mui/material/FormControl";
import { appConfig } from "../../../appConfig";
import AutocompleteWithImage from "../../AutocompleteWithImage";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { matchSlice } from '../../../store/slice/matchSlice';
import { IClub } from "../../../models/IClub";

const AutocompleteClub = ({ data }: { data: IClub[] }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.matchReducer);

  const [value, setValue] = useState<any>(state.clubId);
  const [inputValue, setInputValue] = useState<string | null>("")

  useEffect(() => {
    return () => {
      dispatch(matchSlice.actions.setClubId(null));
      dispatch(matchSlice.actions.setClubDisabled(false));
    }
  }, []) // eslint-disable-line

  const options = useMemo(() => {
    if (data !== undefined) {
      return data.map((item) => ({
        // ...item,
        id: item.id,
        name: item.name,
        src: `${appConfig.MEDIA_ROOT}/crests/${item.crest}`,
      }));
    }
  }, [data]);

  const handleChange = (event: any, value: any) => {
    dispatch(matchSlice.actions.setMatchdayDateDisabled(value === null ? false : true));
    const valueId = (value === null ? null : value.id)
      setValue(valueId)
      dispatch(matchSlice.actions.setClubId(valueId));
  };

  return (
    <FormControl sx={{ minWidth: 250 }} margin="dense" size="small">
      <AutocompleteWithImage
        id="club-autocomplete"
        label="Club"
        data={options}
        isLoading={false}

        valueId={value}
        inputValue={inputValue}
        handleChange={handleChange}
        handleOnInputChange={(_: any, newInputValue: any) => {setInputValue(newInputValue)}}

        disabled={state.clubDisabled}
      />
    </FormControl>
  );
};
export default AutocompleteClub;
