import React, { useState } from "react";
import { MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

interface DialogProps {
  isDialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  dialogText: string;
}

export default function GenericDialog({isDialogOpen, setDialogOpen, dialogText} : DialogProps) {
  const [textValue, setTextValue] = useState("Example Text");

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  return (
    <>
      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            minRows={4}
            value={dialogText}
            onChange={(e) => setTextValue(e.target.value)}
            variant="outlined"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigator.clipboard.writeText(textValue)}>Copy</Button>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
