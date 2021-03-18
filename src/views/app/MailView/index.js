import Sidebar from './Sidebar';
import Compose from './Compose';
import MailList from './MailList';
import Page from 'src/components/Page';
import MailDetails from './MailDetails';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PATH_APP } from 'src/routes/paths';
import { useParams } from 'react-router-dom';
import { getLabels } from 'src/redux/slices/mail';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    [theme.breakpoints.up('md')]: {
      height: '72vh',
      display: 'flex'
    }
  }
}));

// ----------------------------------------------------------------------

function MailView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mailId } = useParams();

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Mail-App | Minimal-UI">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Mail"
          links={[
            {
              name: 'Dashboard',
              href: PATH_APP.root
            },
            { name: 'Mail' }
          ]}
        />

        <Card className={classes.card}>
          <Sidebar />
          {mailId ? <MailDetails /> : <MailList />}
          <Compose />
        </Card>
      </Container>
    </Page>
  );
}

export default MailView;
