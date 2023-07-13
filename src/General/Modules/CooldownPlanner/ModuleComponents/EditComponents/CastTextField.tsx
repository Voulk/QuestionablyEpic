import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    textAlign: "center",
    fontSize: "12px",
  },
});

// turn debugging (console logging) on/off
const debug = false;

const CastTextField: React.FC<TextFieldProps> = (props) => {
  debug && console.log(" -- Debugging On -> CastTextField.js --");
  // log props provided to function
  debug && console.log(props);

  // Convert Time String (00:05) back into date format for input handling
  const constructTime = (timeString: string): Date => {
    let minutes = 0;
    let seconds = 0;
    let newDate = new Date();
    // If date is null or "" or undefined set time as 00:00
    if (timeString === null || timeString === "" || timeString === undefined) {
      // return 00:00 as state "value"
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      let splitTime = newDate.toString().split(" ")[4].split(":");
      props.onChange(splitTime[1] + ":" + splitTime[2]);
      return newDate;
    } else {
      let timeArray = timeString.split(":");
      minutes = parseInt(timeArray[0], 10);
      seconds = parseInt(timeArray[1], 10);
    }
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    return newDate;
  };

  const [value, setValue] = React.useState<Date>(constructTime(props.value)); // construct state "value" from provided time string

  // After checking for errors set state and update table data
  const updateTime = (time: Date | null) => {
    // log the time provided
    debug && console.log(time);

    if (time === null || time?.toString() === "Invalid Date") {
      let newDate = new Date();
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      setValue(newDate); // update state
      let splitTime = newDate.toString().split(" ")[4].split(":");
      props.onChange(splitTime[1] + ":" + splitTime[2]); // update table data
    } else if (time) {
      setValue(time); // update state
      let splitTime = time.toString().split(" ")[4].split(":");
      props.onChange(splitTime[1] + ":" + splitTime[2]); // update table data
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    props.onChange(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        ampm={false}
        ampmInClock={false}
        disableOpenPicker
        views={["minutes", "seconds"]}
        inputFormat="mm:ss"
        mask="__:__"
        value={value}
        onChange={updateTime}
        sx={{ whiteSpace: "nowrap", width: "100%" }}
        renderInput={(params) => (
          <CssTextField
            {...params}
            InputProps={{
              ...params.InputProps,
              onChange: handleInputChange,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CastTextField;
