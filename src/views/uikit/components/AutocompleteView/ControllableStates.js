import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

ControllableStates.propTypes = {
  options: PropTypes.array
};

function ControllableStates({ options }) {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Autocomplete
        fullWidth
        value={value}
        options={options}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
    </>
  );
}

export default ControllableStates;
