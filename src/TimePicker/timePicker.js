import React, { Fragment, useState } from "react";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


function BasicTimePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        ampm={false}
        open={false}
        format="mm:ss"
        label="Minutes and seconds"
        value={props.value}
        onChange={props.onChange}>
        </TimePicker>
      </MuiPickersUtilsProvider>
  );
}

export default BasicTimePicker;