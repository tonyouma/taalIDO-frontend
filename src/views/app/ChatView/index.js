import Sidebar from './Sidebar';
import Page from 'src/components/Page';
import ChatWindow from './ChatWindow';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PATH_APP } from 'src/routes/paths';
import { HeaderDashboard } from 'src/layouts/Common';
import { getConversations, getContacts } from 'src/redux/slices/chat';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    height: '72vh',
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

function ChatView() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Chat-App | Minimal-UI">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Chat"
          links={[
            {
              name: 'Dashboard',
              href: PATH_APP.root
            },
            { name: 'Chat' }
          ]}
        />
        <Card className={classes.card}>
          <Sidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}

export default ChatView;
