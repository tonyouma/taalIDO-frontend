import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP } from 'src/routes/paths';
import { useTranslation } from 'react-i18next';

export default function ContainedButtons() {
  const { i18n, t } = useTranslation();

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
        {t('taalswap.Participants')}
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
