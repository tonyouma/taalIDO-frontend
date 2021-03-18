import React from 'react';
import Page from 'src/components/Page';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import SimpleTransferList from './SimpleTransferList';
import EnhancedTransferList from './EnhancedTransferList';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function TransferListView() {
  const classes = useStyles();

  return (
    <Page
      title="Transfer List-Components | Minimal-UI"
      className={classes.root}
    >
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Transfer List"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Transfer List' }
          ]}
          moreLink="https://next.material-ui.com/components/transfer-list"
        />
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Simple" />
          <CardContent>
            <Block>
              <SimpleTransferList />
            </Block>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Enhanced" />
          <CardContent>
            <Block>
              <EnhancedTransferList />
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default TransferListView;
