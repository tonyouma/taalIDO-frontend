import React from 'react';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import closeFill from '@iconify-icons/eva/close-fill';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Button,
  Container,
  IconButton,
  CardContent
} from '@material-ui/core';
import { MButton } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function SnackbarView() {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSnackbarClose = (color) => {
    enqueueSnackbar(`This is an ${color}`, {
      variant: color,
      action: (key) => (
        <IconButton
          size="small"
          color="inherit"
          onClick={() => closeSnackbar(key)}
        >
          <Icon icon={closeFill} width={24} height={24} />
        </IconButton>
      )
    });
  };

  const onSnackbarAction = (color, anchor) => {
    enqueueSnackbar(`This is an ${color}`, {
      variant: color,
      anchorOrigin: anchor,
      action: (key) => (
        <>
          <Button
            size="small"
            color={color !== 'default' ? color : 'primary'}
            onClick={() => {
              alert(`I belong to snackbar with key ${key}`);
            }}
          >
            Alert
          </Button>
          <Button
            size="small"
            color="inherit"
            onClick={() => closeSnackbar(key)}
          >
            Dismiss
          </Button>
        </>
      )
    });
  };

  return (
    <Page title="Snackbar-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Snackbar"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Snackbar' }
          ]}
          moreLink={[
            'https://next.material-ui.com/components/snackbars',
            'https://www.iamhosseindhv.com/notistack'
          ]}
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Block title="Simple">
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => enqueueSnackbar('This is an default')}
                  >
                    Default
                  </Button>
                  <MButton
                    variant="contained"
                    color="info"
                    onClick={() =>
                      enqueueSnackbar('This is an info', { variant: 'info' })
                    }
                  >
                    Info
                  </MButton>
                  <MButton
                    variant="contained"
                    color="success"
                    onClick={() =>
                      enqueueSnackbar('This is an success', {
                        variant: 'success'
                      })
                    }
                  >
                    Success
                  </MButton>
                  <MButton
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      enqueueSnackbar('This is an warning', {
                        variant: 'warning'
                      })
                    }
                  >
                    Warning
                  </MButton>
                  <MButton
                    variant="contained"
                    color="error"
                    onClick={() =>
                      enqueueSnackbar('This is an error', { variant: 'error' })
                    }
                  >
                    Error
                  </MButton>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="With Close">
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => onSnackbarClose('default')}
                  >
                    Default
                  </Button>
                  <MButton
                    variant="contained"
                    color="info"
                    onClick={() => onSnackbarClose('info')}
                  >
                    Info
                  </MButton>
                  <MButton
                    variant="contained"
                    color="success"
                    onClick={() => onSnackbarClose('success')}
                  >
                    Success
                  </MButton>
                  <MButton
                    variant="contained"
                    color="warning"
                    onClick={() => onSnackbarClose('warning')}
                  >
                    Warning
                  </MButton>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onSnackbarClose('error')}
                  >
                    Error
                  </Button>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="With Action">
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => onSnackbarAction('default')}
                  >
                    Default
                  </Button>
                  <MButton
                    variant="contained"
                    color="info"
                    onClick={() => onSnackbarAction('info')}
                  >
                    Info
                  </MButton>
                  <MButton
                    variant="contained"
                    color="success"
                    onClick={() => onSnackbarAction('success')}
                  >
                    Success
                  </MButton>
                  <MButton
                    variant="contained"
                    color="warning"
                    onClick={() => onSnackbarAction('warning')}
                  >
                    Warning
                  </MButton>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onSnackbarAction('error')}
                  >
                    Error
                  </Button>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="anchorOrigin">
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'top',
                        horizontal: 'left'
                      })
                    }
                  >
                    Top Left
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'top',
                        horizontal: 'center'
                      })
                    }
                  >
                    Top Center
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => onSnackbarAction('default')}
                  >
                    Top Right
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'bottom',
                        horizontal: 'left'
                      })
                    }
                  >
                    Bottom Left
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'bottom',
                        horizontal: 'center'
                      })
                    }
                  >
                    Bottom Center
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'bottom',
                        horizontal: 'right'
                      })
                    }
                  >
                    Bottom Right
                  </Button>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default SnackbarView;
