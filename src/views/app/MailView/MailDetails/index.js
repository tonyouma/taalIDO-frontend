import Toolbar from './Toolbar';
import MailReply from './MailReply';
import AttachBar from './AttachBar';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMail } from 'src/redux/slices/mail';
import Markdown from 'react-markdown/with-html';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  message: {
    '& > p': {
      ...theme.typography.body1,
      marginBottom: theme.spacing(2)
    }
  }
}));

// ----------------------------------------------------------------------

function MailDetails() {
  const classes = useStyles();
  const { mailId } = useParams();
  const dispatch = useDispatch();
  const mail = useSelector((state) => state.mail.mails.byId[mailId]);
  const isAttached = mail && mail.files.length > 0;

  useEffect(() => {
    dispatch(getMail(mailId));
  }, [dispatch, mailId]);

  if (!mail) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Toolbar mail={mail} />

      <Divider />

      <Scrollbars>
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" gutterBottom>
            {mail.subject}
          </Typography>
          <Markdown source={mail.message} className={classes.message} />
        </Box>
      </Scrollbars>

      {isAttached && <AttachBar mail={mail} />}

      <Divider />

      <MailReply />
    </div>
  );
}

export default MailDetails;
