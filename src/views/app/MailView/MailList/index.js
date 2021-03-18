import Toolbar from './Toolbar';
import MailItem from './MailItem';
import { useParams } from 'react-router-dom';
import { getMails } from 'src/redux/slices/mail';
import Scrollbars from 'src/components/Scrollbars';
import React, { useState, useEffect } from 'react';
import EmptyContent from 'src/components/EmptyContent';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column'
  }
}));

function MailList() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const { mails } = useSelector((state) => state.mail);
  const [selectedMails, setSelectedMails] = useState([]);
  const [dense, setDense] = useState(false);
  const isEmpty = mails.allIds.length < 1;

  const handleSelectAllMails = () => {
    setSelectedMails(mails.allIds.map((mailId) => mailId));
  };

  const handleToggleDense = () => {
    setDense((prev) => !prev);
  };

  const handleDeselectAllMails = () => {
    setSelectedMails([]);
  };

  const handleSelectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => {
      if (!prevSelectedMails.includes(mailId)) {
        return [...prevSelectedMails, mailId];
      }
      return prevSelectedMails;
    });
  };

  const handleDeselectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) =>
      prevSelectedMails.filter((id) => id !== mailId)
    );
  };

  useEffect(() => {
    dispatch(getMails(params));
  }, [dispatch, params]);

  return (
    <div className={classes.root}>
      <Toolbar
        mails={mails.allIds.length}
        onSelectAll={handleSelectAllMails}
        selectedMails={selectedMails.length}
        onDeselectAll={handleDeselectAllMails}
        isDense={dense}
        onToggleDense={handleToggleDense}
      />

      <Divider />

      {!isEmpty ? (
        <Scrollbars>
          <Box sx={{ minWidth: { md: 800 } }}>
            {mails.allIds.map((mailId) => (
              <MailItem
                key={mailId}
                isDense={dense}
                mail={mails.byId[mailId]}
                isSelected={selectedMails.includes(mailId)}
                onSelect={() => handleSelectOneMail(mailId)}
                onDeselect={() => handleDeselectOneMail(mailId)}
              />
            ))}
          </Box>
        </Scrollbars>
      ) : (
        <EmptyContent
          title="There is no conversation"
          img="/static/illustrations/illustration_empty_mail.svg"
          sx={{ flexGrow: 1, height: 'auto' }}
        />
      )}
    </div>
  );
}

export default MailList;
