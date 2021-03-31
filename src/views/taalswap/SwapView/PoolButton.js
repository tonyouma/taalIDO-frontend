import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function ContainedButtons() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 }
      }}
    >
      <Button color="error" variant="contained">
        Participate
      </Button>
      <Button color="info" variant="contained">
        Project Info
      </Button>
      <Button color="info" variant="contained">
        Project News
      </Button>
    </Box>
  );
}
