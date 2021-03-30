import React, { useState } from 'react';
import Page from 'src/components/Page';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import { HeaderDashboard } from 'src/layouts/Common';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Grid,
  Radio,
  Container,
  Typography,
  CardHeader,
  RadioGroup,
  CardContent,
  FormControlLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  col: {
    height: 80,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'background.default',
    boxShadow: theme.shadows[25].z8,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper
  }
}));

// ----------------------------------------------------------------------

const LABELS = ['1col', '2col', '3col', '4col', '6col', '12col'];

function GridView() {
  const classes = useStyles();
  const theme = useTheme();
  const [spacing, setSpacing] = useState(2);
  const [column, setColumn] = useState(3);

  const handleChangeSpacing = (event) => {
    setSpacing(Number(event.target.value));
  };

  const handleChangeColumn = (event) => {
    setColumn(Number(event.target.value));
  };

  return (
    <Page title="TaalSwap | IDO" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard heading="Protocol" links={[{ name: 'infotext' }]} />
        <Card sx={{ mb: 5 }}>
          <CardHeader title="XXXX Protocol" />
          <CardContent>
            <Block>
              <Typography variant="body2">
                We appreciate your business. Should you need us to add VAT or
                extra notes let us know!
              </Typography>
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default GridView;
