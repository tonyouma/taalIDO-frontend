import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import useSettings from 'src/hooks/useSettings';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Radio,
  Paper,
  RadioGroup,
  CardActionArea,
  FormControlLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

ThemeMode.propTypes = {
  className: PropTypes.string
};

function ThemeMode({ className }) {
  const classes = useStyles();
  const { themeMode, selectMode } = useSettings();

  return (
    <RadioGroup
      name="themeMode"
      value={themeMode}
      onChange={selectMode}
      className={clsx(classes.root, className)}
    >
      <Grid container spacing={2}>
        {['light', 'dark'].map((mode) => (
          <Grid item xs={6} key={mode}>
            <Paper
              sx={{
                overflow: 'hidden',
                bgcolor: mode === 'dark' ? 'grey.900' : 'common.white',
                boxShadow: (theme) =>
                  themeMode === mode && theme.shadows[25].z12
              }}
            >
              <CardActionArea>
                <Box sx={{ pt: 2, pb: 1, px: 1.5, mb: 4 }}>
                  {[48, 32, 20].map((size, index) => (
                    <Box
                      key={size}
                      sx={{
                        mb: 0.75,
                        height: size,
                        borderRadius: 0.75,
                        opacity:
                          (index === 0 && 0.72) ||
                          (index === 1 && 0.32) ||
                          (index === 2 && 0.16),
                        backgroundColor:
                          themeMode === mode ? 'primary.main' : 'grey.500'
                      }}
                    />
                  ))}
                </Box>
                <Box
                  sx={{
                    mb: 1,
                    mx: 'auto',
                    height: 4,
                    width: '32%',
                    borderRadius: 1,
                    backgroundColor: 'grey.50032'
                  }}
                />
                <FormControlLabel
                  value={mode}
                  control={<Radio />}
                  sx={{
                    top: 0,
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    '& .MuiRadio-root': { display: 'none' }
                  }}
                />
              </CardActionArea>
            </Paper>

            <Box
              sx={{
                mt: 2,
                mx: 'auto',
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                width: themeMode === mode && 10,
                height: themeMode === mode && 10
              }}
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
}

export default ThemeMode;
