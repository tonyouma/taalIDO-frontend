import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import attach2Fill from '@iconify-icons/eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify-icons/ic/round-add-photo-alternate';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  TextField,
  IconButton,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  textarea: {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

PostInput.propTypes = {
  className: PropTypes.string
};

function PostInput({ className }) {
  const classes = useStyles();
  const fileInputRef = useRef(null);

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <TextField
          multiline
          fullWidth
          rows={4}
          placeholder="Share what you are thinking here..."
          className={classes.textarea}
        />

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
              <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
            </IconButton>
            <IconButton size="small" onClick={handleAttach}>
              <Icon icon={attach2Fill} width={24} height={24} />
            </IconButton>
          </Box>
          <Button variant="contained">Post</Button>
        </Box>
      </CardContent>
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Card>
  );
}

export default PostInput;
