import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

Checkboxes.propTypes = {
  options: PropTypes.array
};

function Checkboxes({ options }) {
  return (
    <Autocomplete
      fullWidth
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox checked={selected} />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
  );
}

export default Checkboxes;
