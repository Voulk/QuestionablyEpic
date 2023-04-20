import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Counter = () => {
  // State to store the count value
  const [count, setCount] = useState(1);

  // Increase the count value, respecting the maximum limit of 5
  const increment = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  // Decrease the count value, respecting the minimum limit of 1
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const buttonStyles = {
    width: "26px",
    height: "26px",
    "&.MuiButton-root": {
      minWidth: "26px",
    },
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="subtitle2" sx={{ marginRight: "0.5rem", fontWeight: "bold" }}>
        Quantity:
      </Typography>
      <Button size="small" variant="outlined" onClick={decrement} disabled={count === 1} sx={buttonStyles}>
        -
      </Button>
      <Typography sx={{ margin: "0 0.5rem" }}>{count}</Typography>
      <Button size="small" variant="outlined" onClick={increment} disabled={count === 5} sx={buttonStyles}>
        +
      </Button>
    </Box>
  );
};

export default Counter;
