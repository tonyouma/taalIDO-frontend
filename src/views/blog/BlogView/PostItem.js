import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import { fDate } from 'src/utils/formatTime';
import LazySize from 'src/components/LazySize';
import eyeFill from '@iconify-icons/eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify-icons/eva/share-fill';
import { fShortenNumber } from 'src/utils/formatNumber';
import messageCircleFill from '@iconify-icons/eva/message-circle-fill';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent
} from '@material-ui/core';
import { MIcon } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  cardMediaWrap: {
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)'
  },
  cardContent: {
    paddingTop: 36
  },
  cardTitle: {
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
  },
  avatar: {
    zIndex: 9,
    width: 32,
    height: 32,
    bottom: -16,
    position: 'absolute',
    left: theme.spacing(3)
  },
  avatarShape: {
    zIndex: 9,
    bottom: -15,
    position: 'absolute'
  },
  latestPost: {
    '& $cardMediaWrap': {
      paddingTop: 'calc(100% * 4 / 3)',
      '&:after': {
        top: 0,
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
        background: alpha(theme.palette.grey[900], 0.72)
      }
    },
    '& $cardContent': {
      bottom: 0,
      width: '100%',
      position: 'absolute'
    },
    '& $cardTitle': {
      color: theme.palette.common.white
    },
    '& $avatar': {
      zIndex: 9,
      top: theme.spacing(3),
      left: theme.spacing(3),
      width: theme.spacing(5),
      height: theme.spacing(5)
    },
    '& $avatarShape': {
      display: 'none'
    }
  },
  latestPostLarge: {
    '& $cardMediaWrap': {
      [theme.breakpoints.up('sm')]: {
        paddingTop: 'calc(100% * 3 / 4.66)'
      }
    },
    '& $cardTitle': {
      ...theme.typography.h5,
      height: 60
    }
  }
}));

// ----------------------------------------------------------------------

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  className: PropTypes.string
};

function PostItem({ post, index, className }) {
  const classes = useStyles();
  const { cover, title, view, comment, share, author, createdAt } = post;
  const linkTo = PATH_APP.management.blog.root + '/post/' + paramCase(title);
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: messageCircleFill },
    { number: view, icon: eyeFill },
    { number: share, icon: shareFill }
  ];

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card
        className={clsx(
          classes.root,
          {
            [classes.latestPost]: latestPostLarge || latestPost,
            [classes.latestPostLarge]: latestPostLarge
          },
          className
        )}
      >
        <div className={classes.cardMediaWrap}>
          <MIcon
            size={80}
            color="paper"
            src="/static/icons/shape-avatar.svg"
            className={classes.avatarShape}
          />
          <Avatar
            alt={author.name}
            src={author.avatarUrl}
            className={classes.avatar}
          />
          <LazySize
            alt={title}
            src={cover.small}
            size={`${cover.small} 600w, ${cover.medium} 960w`}
            sx={{ top: 0, height: '100%', position: 'absolute' }}
          />
        </div>

        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(createdAt)}
          </Typography>

          <Link
            to={linkTo}
            color="inherit"
            variant="subtitle2"
            component={RouterLink}
            className={classes.cardTitle}
          >
            {title}
          </Link>

          <Box
            sx={{
              mt: 3,
              display: 'flex',
              flexWrap: 'wrap',
              color: 'text.disabled',
              justifyContent: 'flex-end'
            }}
          >
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5
                }}
              >
                <Box
                  component={Icon}
                  icon={info.icon}
                  sx={{ width: 16, height: 16, mr: 0.5 }}
                />
                <Typography variant="caption">
                  {fShortenNumber(info.number)}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PostItem;
