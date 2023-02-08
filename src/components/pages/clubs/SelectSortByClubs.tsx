import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { clubSlice } from "../../../store/slice/clubSlice";

const SelectSortByClubs = () => {
    const options = ["country", "club"];
    const state = useAppSelector((state) => state.clubReducer);
    const dispatch = useAppDispatch();

    const handleChange = (event: any) => {
        dispatch(clubSlice.actions.setSortBy(event.target.value));
    };

    return (
        <FormControl sx={{ minWidth: 100 }} margin="dense" size="small">
            <InputLabel>Sort by</InputLabel>
            <Select
                label="Sort by"
                value={state.sortBy}
                onChange={handleChange}
                disabled={state.sortByDisabled ? true : false}
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

export default SelectSortByClubs;
