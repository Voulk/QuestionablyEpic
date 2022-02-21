import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    textAlign: "center",
  },
});

// turn debugging (console logging) on/off
const debug = false;

export default function CastTextField(props) {
  debug && console.log(" -- Debugging On -> CastTextField.js --");
  // log props provided to function
  debug && console.log(props);

  // Convert Time String (00:05) back into date format for input handling
  const constructTime = (timeString) => {
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

  // construct state "value" from provided time string
  const [value, setValue] = React.useState(constructTime(props.value));

  // After checking for errors set state and update table data
  const updateTime = (time) => {
    // log the time provided
    debug && console.log(time);

    if (time === null || time.toString() === "Invalid Date") {
      let newDate = new Date();
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      // update state
      setValue(newDate);
      // update table data
      let splitTime = newDate.toString().split(" ")[4].split(":");
      props.onChange(splitTime[1] + ":" + splitTime[2]);
    } else {
      // update state
      setValue(time);
      // update table data
      let splitTime = time.toString().split(" ")[4].split(":");
      props.onChange(splitTime[1] + ":" + splitTime[2]);
    }
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
        onChange={(newValue) => {
          updateTime(newValue);
        }}
        sx={{ whiteSpace: "nowrap", width: "100%" }}
        renderInput={(params) => (
          <CssTextField
            inputProps={{
              oninput: (value) =>
                // only allow numbers
                value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"),
            }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
