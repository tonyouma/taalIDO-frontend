import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

Sizes.propTypes = {
  options: PropTypes.array
};

function Sizes({ options }) {
  return (
    <>
      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={(option) => option.title}
        defaultValue={options[13]}
        renderInput={(params) => (
          <TextField {...params} label="Size Medium" placeholder="Favorites" />
        )}
      />
      <br />
      <Autocomplete
        fullWidth
        multiple
        size="small"
        options={options}
        getOptionLabel={(option) => option.title}
        defaultValue={[options[13]]}
        renderInput={(params) => (
          <TextField {...params} label="Size small" placeholder="Favorites" />
        )}
      />
    </>
  );
}

export default Sizes;
