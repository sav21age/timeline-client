import FormControl from "@mui/material/FormControl";
import { appConfig } from "../../../appConfig";
import { areaAPI } from "../../../store/api/areaApi";
import Error from "../../Error";
import AutocompleteWithImage from "../../AutocompleteWithImage";
import {clubSlice} from "../../../store/slice/clubSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useState } from "react";

const AutocompleteArea = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.clubReducer);

  const { data, error, isLoading } = areaAPI.useFetchAllAreaQuery("");

  const [value, setValue] = useState<any>(state.areaId);
  const [inputValue, setInputValue] = useState<string | null>("")

  let options;
  if (data !== undefined) {
    options = data.map((item) => ({
      // ...item,
      id: item.id,
      name: item.name,
      src: `${appConfig.MEDIA_ROOT}/flags/${item.id}.svg`,
    }));
  }

  const handleChange = (_: any, value: any) => {
    dispatch(clubSlice.actions.setSortByDisabled(value === null ? false : true));
    const valueId = (value === null ? null : value.id)
    setValue(valueId)
    dispatch(clubSlice.actions.setAreaId(valueId));
  };

  if (error) {
    return <Error />;
  } else {
    return (
      <FormControl sx={{ minWidth: 250 }} margin="dense" size="small">
        <AutocompleteWithImage
          id="area-autocomplete"
          label="Country"
          data={options}
          isLoading={isLoading}

          valueId={value}
          inputValue={inputValue}
          handleChange={handleChange}
          handleOnInputChange={(_: any, inputValue: any) => { setInputValue(inputValue) }}

          disabled={false}
        />
      </FormControl>
    );
  }
};

export default AutocompleteArea;
