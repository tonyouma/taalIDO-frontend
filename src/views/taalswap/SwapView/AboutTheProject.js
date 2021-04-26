import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
  Link
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2)
  },
  descRow: {
    marginBottom: theme.spacing(2.5)
  },
  linkText: {
    color: theme.palette.text.secondary
  }
}));

const AboutTheProject = ({ pool }) => {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  return (
    <div className={clsx(classes.root)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ fontSize: 20 }}>
                    {t('taalswap.AboutTheProject')}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className={classes.descRow}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Description
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        marginTop: '10px'
                      }}
                    >
                      {pool.projectDesc}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Web Site
                    </Typography>
                    <Typography
                      component="a"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      <Link
                        className={classes.linkText}
                        href={pool.websiteUrl}
                        target="_blank"
                      >
                        {pool.websiteUrl}
                      </Link>
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      E-Mail
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {pool.email}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Telegram
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      <Link
                        className={classes.linkText}
                        href={`https://t.me/${pool.telegramHandle.replace(
                          '@',
                          ''
                        )}`}
                        target="_blank"
                      >
                        {pool.telegramHandle}
                      </Link>
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Twitter
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      <Link
                        className={classes.linkText}
                        href={`https://twitter.com/${pool.twitterId}`}
                        target="_blank"
                      >
                        {pool.twitterId}
                      </Link>
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Medium
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      <Link
                        className={classes.linkText}
                        href={pool.mediumURL}
                        target="_blank"
                      >
                        {pool.mediumURL}
                      </Link>
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {pool.twitterId !== undefined && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <TwitterTimelineEmbed
                      sourceType="profile"
                      // screenName="saurabhnemade"
                      screenName={pool.twitterId}
                      options={{ height: 425 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default AboutTheProject;
