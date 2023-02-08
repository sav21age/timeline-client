import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { clubSlice } from "../../../store/slice/clubSlice";

const SelectPerPageClubs = () => {
  const options = [6, 12, 18, 24];
  const state = useAppSelector((state) => state.clubReducer);
  const dispatch = useAppDispatch();

  const handleChange = (event: any) => {
    dispatch(clubSlice.actions.setPerPage(event.target.value));
  };

  return (
    <FormControl sx={{ minWidth: 100 }} margin="dense" size="small">
      <InputLabel>Per page</InputLabel>
      <Select
        label="Per page"
        value={state.perPage}
        onChange={handleChange}
      >
        {options.map((option: any) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectPerPageClubs;
