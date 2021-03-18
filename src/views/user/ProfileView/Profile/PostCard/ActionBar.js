import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import heartFill from '@iconify-icons/eva/heart-fill';
import shareFill from '@iconify-icons/eva/share-fill';
import { fShortenNumber } from 'src/utils/formatNumber';
import messageSquareFill from '@iconify-icons/eva/message-square-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  IconButton,
  AvatarGroup,
  FormControlLabel
} from '@material-ui/core';
import { MCheckbox } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(3, 0)
  }
}));

// ----------------------------------------------------------------------

ActionBar.propTypes = {
  post: PropTypes.object,
  likes: PropTypes.number,
  isLiked: PropTypes.bool,
  onClickLike: PropTypes.func,
  onClickUnlike: PropTypes.func,
  onClickComment: PropTypes.func,
  className: PropTypes.string
};

function ActionBar({
  post,
  likes,
  isLiked,
  onClickLike,
  onClickUnlike,
  onClickComment,
  className
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <FormControlLabel
        control={
          <MCheckbox
            size="small"
            color="error"
            checked={isLiked}
            icon={<Icon icon={heartFill} />}
            checkedIcon={<Icon icon={heartFill} />}
            onChange={isLiked ? onClickUnlike : onClickLike}
          />
        }
        label={fShortenNumber(likes)}
        sx={{ minWidth: 72, mr: 0 }}
      />

      <AvatarGroup
        max={4}
        sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}
      >
        {post.personLikes.map((person) => (
          <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
        ))}
      </AvatarGroup>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton onClick={onClickComment}>
        <Icon icon={messageSquareFill} width={20} height={20} />
      </IconButton>
      <IconButton>
        <Icon icon={shareFill} width={20} height={20} />
      </IconButton>
    </div>
  );
}

export default ActionBar;
