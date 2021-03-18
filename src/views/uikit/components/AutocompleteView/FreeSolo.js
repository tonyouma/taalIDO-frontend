import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

FreeSolo.propTypes = {
  options: PropTypes.array
};

function FreeSolo({ options }) {
  return (
    <>
      <Autocomplete
        fullWidth
        freeSolo
        options={options.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="freeSolo" margin="normal" />
        )}
      />
      <Autocomplete
        fullWidth
        freeSolo
        disableClearable
        options={options.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </>
  );
}

export default FreeSolo;
