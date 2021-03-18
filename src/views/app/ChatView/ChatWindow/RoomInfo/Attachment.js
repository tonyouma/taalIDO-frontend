import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { uniq, flatten } from 'lodash';
import { fDateTime } from 'src/utils/formatTime';
import Scrollbars from 'src/components/Scrollbars';
import { getFileFullName, getFileThumb } from 'src/utils/getFileFormat';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Collapse, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    paddingBottom: theme.spacing(2)
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 2.5)
  },
  fileThumb: {
    width: 40,
    height: 40,
    flexShrink: 0,
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[500_16],
    '& img': { width: '100%', height: '100%' },
    '& svg': { width: 24, height: 24 }
  },
  collapseButton: {
    ...theme.typography.overline,
    height: 40,
    flexShrink: 0,
    borderRadius: 0,
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

function AttachmentItem({ file, fileUrl }) {
  const classes = useStyles();

  return (
    <div key={fileUrl} className={classes.fileItem}>
      <div className={classes.fileThumb}>{getFileThumb(fileUrl)}</div>
      <Box sx={{ ml: 1.5, maxWidth: 150 }}>
        <Typography variant="body2" noWrap>
          {getFileFullName(fileUrl)}
        </Typography>
        <Typography
          noWrap
          variant="caption"
          sx={{ color: 'text.secondary', display: 'block' }}
        >
          {fDateTime(file.createdAt)}
        </Typography>
      </Box>
    </div>
  );
}

Attachment.propTypes = {
  conversation: PropTypes.object.isRequired,
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
  className: PropTypes.string
};

function Attachment({
  conversation,
  isCollapse,
  onCollapse,
  className,
  ...other
}) {
  const classes = useStyles();
  const totalAttachment = uniq(
    flatten(conversation.messages.map((item) => item.attachments))
  ).length;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Button
        fullWidth
        color="inherit"
        onClick={onCollapse}
        endIcon={
          <Icon
            icon={isCollapse ? arrowIosDownwardFill : arrowIosForwardFill}
            width={16}
            height={16}
          />
        }
        className={classes.collapseButton}
      >
        attachment ({totalAttachment})
      </Button>

      {!isCollapse && <Divider />}

      <Scrollbars>
        <Collapse in={isCollapse}>
          {conversation.messages.map((file) => (
            <div key={file.id}>
              {file.attachments.map((fileUrl) => (
                <AttachmentItem key={fileUrl} file={file} fileUrl={fileUrl} />
              ))}
            </div>
          ))}
        </Collapse>
      </Scrollbars>
    </div>
  );
}

export default Attachment;
