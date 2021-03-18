import React from 'react';
import Page from 'src/components/Page';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import FolderIcon from '@material-ui/icons/Folder';
import BadgeStatus from 'src/components/BadgeStatus';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { HeaderDashboard } from 'src/layouts/Common';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Badge,
  Avatar,
  Container,
  CardContent,
  AvatarGroup,
  Box
} from '@material-ui/core';
import { MAvatar } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function AvatarView() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Page title="Avatar-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Avatar"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Avatar' }
          ]}
          moreLink="https://next.material-ui.com/components/avatars"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Image avatars">
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatars/avatar_1.jpg"
                  />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_2.jpg"
                  />
                  <Avatar
                    alt="Cindy Baker"
                    src="/static/images/avatars/avatar_3.jpg"
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Letter avatars">
                  <MAvatar>H</MAvatar>
                  <MAvatar color="primary">N</MAvatar>
                  <MAvatar color="info">OP</MAvatar>
                  <MAvatar color="success">CB</MAvatar>
                  <MAvatar color="warning">ZP</MAvatar>
                  <MAvatar color="error">OH</MAvatar>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Icon avatars">
                  <MAvatar color="primary">
                    <FolderIcon />
                  </MAvatar>
                  <MAvatar color="info">
                    <PageviewIcon />
                  </MAvatar>
                  <MAvatar color="success">
                    <AssignmentIcon />
                  </MAvatar>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Variant">
                  <MAvatar variant="square" color="primary">
                    <FolderIcon />
                  </MAvatar>
                  <MAvatar variant="rounded" color="info">
                    <PageviewIcon />
                  </MAvatar>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Grouped">
                  <AvatarGroup max={4}>
                    <MAvatar
                      alt="Remy Sharp"
                      src="/static/images/avatars/avatar_4.jpg"
                    />
                    <MAvatar color="info">OP</MAvatar>
                    <MAvatar
                      alt="Cindy Baker"
                      src="/static/images/avatars/avatar_5.jpg"
                    />
                    <MAvatar
                      alt="Agnes Walker"
                      src="/static/images/avatars/avatar_6.jpg"
                    />
                    <MAvatar
                      alt="Trevor Henderson"
                      src="/static/images/avatars/avatar_7.jpg"
                    />
                    <MAvatar
                      alt="Trevor Henderson"
                      src="/static/images/avatars/avatar_8.jpg"
                    />
                    <MAvatar
                      alt="Trevor Henderson"
                      src="/static/images/avatars/avatar_9.jpg"
                    />
                  </AvatarGroup>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="With badge">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    badgeContent={
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatars/avatar_7.jpg"
                        sx={{
                          width: 24,
                          height: 24,
                          border: `solid 2px ${theme.palette.background.paper}`
                        }}
                      />
                    }
                  >
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatars/avatar_8.jpg"
                    />
                  </Badge>

                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatars/avatar_9.jpg"
                    />
                    <BadgeStatus
                      status="online"
                      sx={{ right: 2, bottom: 2, position: 'absolute' }}
                    />
                  </Box>

                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatars/avatar_10.jpg"
                    />
                    <BadgeStatus
                      status="away"
                      sx={{ right: 2, bottom: 2, position: 'absolute' }}
                    />
                  </Box>

                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatars/avatar_11.jpg"
                    />
                    <BadgeStatus
                      status="busy"
                      sx={{ right: 2, bottom: 2, position: 'absolute' }}
                    />
                  </Box>

                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatars/avatar_12.jpg"
                    />
                    <BadgeStatus
                      status="invisible"
                      sx={{ right: 2, bottom: 2, position: 'absolute' }}
                    />
                  </Box>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Sizes">
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_1.jpg"
                    sx={{ width: 24, height: 24 }}
                  />

                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_2.jpg"
                    sx={{ width: 32, height: 32 }}
                  />

                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_3.jpg"
                  />

                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_5.jpg"
                    sx={{ width: 48, height: 48 }}
                  />

                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_6.jpg"
                    sx={{ width: 56, height: 56 }}
                  />

                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_7.jpg"
                    sx={{ width: 64, height: 64 }}
                  />

                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_8.jpg"
                    sx={{ width: 80, height: 80 }}
                  />

                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatars/avatar_9.jpg"
                    sx={{ width: 128, height: 128 }}
                  />
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default AvatarView;
