import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import SearchNotFound from 'src/components/SearchNotFound';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  TextField,
  Typography,
  Autocomplete
} from '@material-ui/core';
import { MChip } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 3)
  },
  autocomplete: {
    minWidth: 280,
    marginLeft: theme.spacing(2),
    '&.Mui-focused': {
      '& $search': { boxShadow: theme.shadows[25].z8 }
    }
  },
  search: {
    transition: theme.transitions.create('box-shadow', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  popper: { maxWidth: 280 },
  paper: { borderRadius: theme.shape.borderRadiusMd },
  option: {
    padding: theme.spacing(1, 2.5),
    '&[aria-selected="true"], &[aria-selected="true"][data-focus="true"]': {
      backgroundColor: theme.palette.action.selected
    }
  },
  optionAvatar: {
    width: 32,
    height: 32,
    overflow: 'hidden',
    borderRadius: '50%',
    position: 'relative'
  },
  checkmarkAvatar: {
    top: 0,
    opacity: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.grey[900], 0.8),
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    })
  },
  checkmarkAvatarSelected: {
    opacity: 1,
    color: theme.palette.primary.main
  }
}));

// ----------------------------------------------------------------------

HeaderCompose.propTypes = {
  contacts: PropTypes.array,
  recipients: PropTypes.array,
  onAddRecipient: PropTypes.func,
  className: PropTypes.string
};

function HeaderCompose({
  contacts,
  recipients,
  onAddRecipient,
  className,
  ...other
}) {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleAddRecipient = (e, recipient) => {
    setQuery('');
    if (onAddRecipient) {
      onAddRecipient(recipient);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        To:
      </Typography>

      <Autocomplete
        multiple
        size="small"
        disablePortal
        popupIcon={null}
        clearText={null}
        noOptionsText={<SearchNotFound searchQuery={query} />}
        onChange={handleAddRecipient}
        onInputChange={handleChangeQuery}
        options={contacts}
        getOptionLabel={(recipient) => recipient.name}
        classes={{
          root: classes.autocomplete,
          popper: classes.popper,
          paper: classes.paper,
          option: classes.option,
          inputRoot: classes.search
        }}
        renderOption={(props, recipient, { inputValue, selected }) => {
          const { name, avatar } = recipient;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          return (
            <li {...props}>
              <div className={classes.optionAvatar}>
                <Avatar alt={name} src={avatar} />
                <div
                  className={clsx(classes.checkmarkAvatar, {
                    [classes.checkmarkAvatarSelected]: selected
                  })}
                >
                  <Icon icon={checkmarkFill} width={20} height={20} />
                </div>
              </div>
              <Box sx={{ ml: 2 }} />
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </li>
          );
        }}
        renderTags={(recipients, getTagProps) =>
          recipients.map((recipient, index) => {
            const { name, avatar } = recipient;
            return (
              <MChip
                size="small"
                label={name}
                color="info"
                avatar={<Avatar alt={name} src={avatar} />}
                {...getTagProps({ index })}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={recipients.length === 0 ? 'Recipients' : ''}
          />
        )}
      />
    </div>
  );
}

export default HeaderCompose;
