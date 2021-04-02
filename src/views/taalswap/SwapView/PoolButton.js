import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';

export default function ContainedButtons() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 }
      }}
    >
      <Button
        to={PATH_APP.taalswap.participate}
        component={RouterLink}
        color="error"
        variant="contained"
      >
        Participants
      </Button>
      {/* <Button color="info" variant="contained">
        Project Info
      </Button>
      <Button color="info" variant="contained">
        Project News
      </Button> */}
    </Box>
  );
}
