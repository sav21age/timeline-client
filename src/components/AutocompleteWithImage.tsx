import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type Props = {
  id: string,
  isLoading: boolean,
  label: string,
  // handleChange: (event: React.SyntheticEvent<Element, Event>) => void;
  handleChange?: any,
  handleOnInputChange?: any,
  data: any,
  disabled: boolean,
  valueId?: any,
  inputValue?: any,
};

type OptionProps = {
  name: string,
  src: string
};

type ValueProps = {
  name: string,
};

const AutocompleteWithImage = (props: Props) => {
  return (
    <Autocomplete
      id={props.id}
      autoComplete={false}
      size="small"

      value={props.valueId === null ? null : props.data.filter((item: any) => item.id === props.valueId)[0]}
      inputValue={props.inputValue}
      onChange={props.handleChange}
      onInputChange={props.handleOnInputChange}

      options={props.isLoading ? [] : props.data}
      loading={props.isLoading ? true : false}
      disabled={props.disabled}
      autoHighlight
      isOptionEqualToValue={(option: OptionProps, value: ValueProps) => option.name === value.name}
      getOptionLabel={(option: OptionProps) => option.name}
      renderOption={(renderProps, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...renderProps}
        >
          <img width="20" src={option?.src} alt={option?.name} />
          {option?.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "off", // disable autocomplete and autofill
            // autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
export default AutocompleteWithImage;
