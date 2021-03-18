import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import heartFill from '@iconify-icons/eva/heart-fill';
import { fShortenNumber } from 'src/utils/formatNumber';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Chip,
  Avatar,
  AvatarGroup,
  FormControlLabel
} from '@material-ui/core';
import { MCheckbox } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0)
  }
}));

// ----------------------------------------------------------------------

Tags.propTypes = {
  post: PropTypes.object.isRequired,
  className: PropTypes.string
};

function Tags({ post, className }) {
  const classes = useStyles();
  const { favorite, tags, favoritePerson } = post;

  return (
    <div className={clsx(classes.root, className)}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          onClick={() => {}}
          sx={{
            '&:not(:last-child)': { mr: 1 }
          }}
        />
      ))}

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <MCheckbox
              defaultChecked
              size="small"
              color="error"
              icon={<Icon icon={heartFill} />}
              checkedIcon={<Icon icon={heartFill} />}
            />
          }
          label={fShortenNumber(favorite)}
        />
        <AvatarGroup
          max={4}
          sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}
        >
          {favoritePerson.map((person) => (
            <Avatar
              key={person.name}
              alt={person.name}
              src={person.avatarUrl}
            />
          ))}
        </AvatarGroup>
      </Box>
    </div>
  );
}

export default Tags;
