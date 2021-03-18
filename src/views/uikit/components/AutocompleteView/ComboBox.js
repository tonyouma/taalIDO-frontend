import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

ComboBox.propTypes = {
  options: PropTypes.array
};

function ComboBox({ options }) {
  return (
    <Autocomplete
      fullWidth
      options={options}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" />}
    />
  );
}

export default ComboBox;
