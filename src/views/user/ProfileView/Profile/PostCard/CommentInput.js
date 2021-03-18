import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import MyAvatar from 'src/components/MyAvatar';
import EmojiPicker from 'src/components/EmojiPicker';
import roundSend from '@iconify-icons/ic/round-send';
import roundAddPhotoAlternate from '@iconify-icons/ic/round-add-photo-alternate';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },
  input: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

CommentInput.propTypes = {
  message: PropTypes.string,
  fileInputRef: PropTypes.object,
  commentInputRef: PropTypes.object,
  onSetMessage: PropTypes.func,
  onClickAttach: PropTypes.func,
  onChangeMessage: PropTypes.func,
  className: PropTypes.string
};

function CommentInput({
  message,
  fileInputRef,
  commentInputRef,
  onSetMessage,
  onClickAttach,
  onChangeMessage,
  className
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <MyAvatar />
      <TextField
        fullWidth
        size="small"
        value={message}
        inputRef={commentInputRef}
        placeholder="Write a comment…"
        onChange={onChangeMessage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onClickAttach}>
                <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
              </IconButton>
              <EmojiPicker alignRight value={message} setValue={onSetMessage} />
            </InputAdornment>
          )
        }}
        className={classes.input}
      />
      <IconButton>
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </div>
  );
}

export default CommentInput;
