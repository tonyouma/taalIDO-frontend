import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Select,
  Switch,
  MenuItem,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormControlLabel,
  DialogContentText
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  form: {
    margin: 'auto',
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'column'
  }
}));

// ----------------------------------------------------------------------

function MaxWidthDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Max Width Dialog
      </Button>

      <Dialog
        open={open}
        maxWidth={maxWidth}
        onClose={handleClose}
        fullWidth={fullWidth}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl
              sx={{
                mt: 2,
                minWidth: 120
              }}
            >
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width'
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
              sx={{ mt: 1 }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MaxWidthDialog;
