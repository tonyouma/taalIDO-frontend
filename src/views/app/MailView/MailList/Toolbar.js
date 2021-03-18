import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { openSidebar } from 'src/redux/slices/mail';
import menuFill from '@iconify-icons/eva/menu-fill';
import searchFill from '@iconify-icons/eva/search-fill';
import refreshFill from '@iconify-icons/eva/refresh-fill';
import collapseFill from '@iconify-icons/eva/collapse-fill';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Hidden,
  Tooltip,
  Checkbox,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: 84,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2)
  },
  icon: {
    width: 20,
    height: 20
  },
  search: {
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { boxShadow: theme.shadows[25].z8 },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    },
    [theme.breakpoints.up('md')]: {
      width: 240,
      flexDirection: 'row',
      '&.Mui-focused': { width: 280 }
    }
  }
}));

// ----------------------------------------------------------------------

Toolbar.propTypes = {
  mails: PropTypes.number.isRequired,
  isDense: PropTypes.bool,
  selectedMails: PropTypes.number.isRequired,
  onToggleDense: PropTypes.func,
  onSelectAll: PropTypes.func,
  onDeselectAll: PropTypes.func,
  className: PropTypes.string
};

function Toolbar({
  mails,
  isDense,
  selectedMails,
  onToggleDense,
  onSelectAll,
  onDeselectAll,
  className,
  ...other
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  const handleSelectChange = (event) =>
    event.target.checked ? onSelectAll() : onDeselectAll();

  const selectedAllMails = selectedMails === mails && mails > 0;
  const selectedSomeMails = selectedMails > 0 && selectedMails < mails;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Hidden mdUp>
        <IconButton onClick={handleOpenSidebar}>
          <Icon icon={menuFill} />
        </IconButton>
      </Hidden>

      <Hidden smDown>
        <Checkbox
          checked={selectedAllMails}
          indeterminate={selectedSomeMails}
          onChange={handleSelectChange}
        />
        <Tooltip title="Refresh">
          <IconButton>
            <Icon icon={refreshFill} className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Dense">
          <IconButton onClick={onToggleDense}>
            <Icon icon={collapseFill} className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title="More">
          <IconButton>
            <Icon icon={moreVerticalFill} className={classes.icon} />
          </IconButton>
        </Tooltip>
      </Hidden>

      <Box sx={{ flexGrow: 1 }} />

      <FormControl size="small">
        <OutlinedInput
          placeholder="Search mail…"
          startAdornment={
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: 'text.disabled' }}
              />
            </InputAdornment>
          }
          className={classes.search}
        />
      </FormControl>

      <Hidden smDown>
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
            1 - {mails} of {mails}
          </Typography>
          <Tooltip title="Next page">
            <IconButton>
              <Icon icon={arrowIosBackFill} className={classes.icon} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous page">
            <IconButton>
              <Icon icon={arrowIosForwardFill} className={classes.icon} />
            </IconButton>
          </Tooltip>
        </Box>
      </Hidden>
    </div>
  );
}

export default Toolbar;
