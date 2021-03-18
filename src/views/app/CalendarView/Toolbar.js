import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { fDate } from 'src/utils/formatTime';
import roundViewDay from '@iconify-icons/ic/round-view-day';
import roundViewWeek from '@iconify-icons/ic/round-view-week';
import roundViewAgenda from '@iconify-icons/ic/round-view-agenda';
import roundViewModule from '@iconify-icons/ic/round-view-module';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Hidden,
  Tooltip,
  Typography,
  IconButton,
  ToggleButton
} from '@material-ui/core';
import { MButton } from 'src/theme';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: roundViewModule },
  { value: 'timeGridWeek', label: 'Week', icon: roundViewWeek },
  { value: 'timeGridDay', label: 'Day', icon: roundViewDay },
  { value: 'listWeek', label: 'Agenda', icon: roundViewAgenda }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      padding: theme.spacing(1.75, 3),
      justifyContent: 'space-between'
    }
  },
  list: {
    '& > *:not(:last-of-type)': {
      marginRight: theme.spacing(1)
    }
  }
}));

// ----------------------------------------------------------------------

Toolbar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onToday: PropTypes.func,
  onNextDate: PropTypes.func,
  onPrevDate: PropTypes.func,
  onChangeView: PropTypes.func,
  view: PropTypes.oneOf([
    'dayGridMonth',
    'timeGridWeek',
    'timeGridDay',
    'listWeek'
  ]),
  className: PropTypes.string
};

function Toolbar({
  date,
  view,
  className,
  onNextDate,
  onPrevDate,
  onToday,
  onChangeView,
  ...other
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Hidden smDown>
        <div className={classes.list}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={viewOption.label}>
              <ToggleButton
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
                sx={{ width: 32, height: 32, padding: 0 }}
              >
                <Icon icon={viewOption.icon} width={20} height={20} />
              </ToggleButton>
            </Tooltip>
          ))}
        </div>
      </Hidden>

      <Typography
        variant="h5"
        sx={{
          my: { xs: 1, sm: 0 }
        }}
      >
        {fDate(date)}
      </Typography>

      <div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onPrevDate}>
            <Icon icon={arrowIosBackFill} width={18} height={18} />
          </IconButton>

          <MButton
            size="small"
            color="error"
            variant="contained"
            onClick={onToday}
            sx={{ mx: 0.5 }}
          >
            Today
          </MButton>

          <IconButton onClick={onNextDate}>
            <Icon icon={arrowIosForwardFill} width={18} height={18} />
          </IconButton>
        </Box>
      </div>
    </div>
  );
}

export default Toolbar;
