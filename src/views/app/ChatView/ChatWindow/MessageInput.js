import clsx from 'clsx';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import micFill from '@iconify-icons/eva/mic-fill';
import roundSend from '@iconify-icons/ic/round-send';
import EmojiPicker from 'src/components/EmojiPicker';
import attach2Fill from '@iconify-icons/eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify-icons/ic/round-add-photo-alternate';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Input,
  Divider,
  IconButton,
  InputAdornment
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 56,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  input: { height: '100%' }
}));

// ----------------------------------------------------------------------

MessageInput.propTypes = {
  disabled: PropTypes.bool,
  conversationId: PropTypes.string,
  onSend: PropTypes.func,
  className: PropTypes.string
};

function MessageInput({
  disabled,
  conversationId,
  onSend,
  className,
  ...other
}) {
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    if (onSend) {
      onSend({
        conversationId: conversationId,
        messageId: faker.random.uuid(),
        message: message,
        contentType: 'text',
        attachments: [],
        createdAt: new Date(),
        senderId: '8864c717-587d-472a-929a-8e5f298024da-0'
      });
    }
    setMessage('');
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        className={classes.input}
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker
              disabled={disabled}
              value={message}
              setValue={setMessage}
            />
          </InputAdornment>
        }
        endAdornment={
          <Box sx={{ flexShrink: 0, mr: 1.5, '& > *': { mx: 0.5 } }}>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
            </IconButton>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <Icon icon={attach2Fill} width={24} height={24} />
            </IconButton>
            <IconButton disabled={disabled} size="small">
              <Icon icon={micFill} width={24} height={24} />
            </IconButton>
          </Box>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </div>
  );
}

export default MessageInput;
