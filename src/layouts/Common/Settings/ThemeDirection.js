import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import useSettings from 'src/hooks/useSettings';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  CardActionArea,
  FormControlLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

ThemeDirection.propTypes = {
  className: PropTypes.string
};

function ThemeDirection({ className }) {
  const classes = useStyles();
  const { themeDirection, selectDirection } = useSettings();

  return (
    <RadioGroup
      name="themeDirection"
      value={themeDirection}
      onChange={selectDirection}
      className={clsx(classes.root, className)}
    >
      <Grid container spacing={2}>
        {['ltr', 'rtl'].map((direction) => (
          <Grid item xs={6} key={direction}>
            <Paper
              variant={themeDirection === direction ? 'elevation' : 'outlined'}
              sx={{
                overflow: 'hidden',
                boxShadow: (theme) =>
                  themeDirection === direction && theme.shadows[25].z12
              }}
            >
              <CardActionArea>
                <Box
                  sx={{
                    py: 2.5,
                    px: 1.5,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: themeDirection === 'rtl' && 'scaleX(-1)',
                    alignItems: direction === 'rtl' && 'flex-end'
                  }}
                >
                  {[48, 32, 20].map((size, index) => (
                    <Box
                      key={size}
                      sx={{
                        mb: 0.75,
                        width: size,
                        height: size / 2,
                        borderRadius: 0.75,
                        opacity:
                          (index === 0 && 0.72) ||
                          (index === 1 && 0.32) ||
                          (index === 2 && 0.16),
                        bgcolor:
                          themeDirection === direction
                            ? 'primary.main'
                            : 'grey.500'
                      }}
                    />
                  ))}
                </Box>
                <FormControlLabel
                  value={direction}
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
                bgcolor: 'primary.main',
                width: themeDirection === direction && 10,
                height: themeDirection === direction && 10
              }}
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
}

export default ThemeDirection;
