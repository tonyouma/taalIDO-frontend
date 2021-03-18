import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { fDate } from 'src/utils/formatTime';
import { fShortenNumber } from 'src/utils/formatNumber';
import roundThumbUp from '@iconify-icons/ic/round-thumb-up';
import roundVerified from '@iconify-icons/ic/round-verified';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  Button,
  Rating,
  Avatar,
  ListItem,
  Pagination,
  Typography
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3, 3, 5) },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(0),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: { flexDirection: 'row' }
  },
  avatar: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(8),
      height: theme.spacing(8)
    }
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      minWidth: 160,
      textAlign: 'center',
      flexDirection: 'column',
      marginBottom: theme.spacing(0)
    },
    [theme.breakpoints.up('md')]: { minWidth: 240 }
  }
}));

// ----------------------------------------------------------------------

function ReviewItem({ review }) {
  const [isHelpful, setHelpfuls] = useState(false);
  const classes = useStyles();
  const {
    name,
    rating,
    comment,
    helpful,
    postedAt,
    avatarUrl,
    isPurchased
  } = review;

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <ListItem disableGutters className={clsx(classes.item)}>
        <div className={classes.info}>
          <Avatar src={avatarUrl} className={classes.avatar} />
          <div>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary' }}
              noWrap
            >
              {fDate(postedAt)}
            </Typography>
          </div>
        </div>

        <div className={classes.content}>
          <Rating size="small" value={rating} precision={0.1} readOnly />

          {isPurchased && (
            <Typography
              variant="caption"
              sx={{
                my: 1,
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main'
              }}
            >
              <Icon icon={roundVerified} width={16} height={16} />
              &nbsp;Verified purchase
            </Typography>
          )}

          <Typography variant="body2">{comment}</Typography>

          <Box
            sx={{
              mt: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            <Typography variant="body2" sx={{ mr: 1 }}>
              {!isHelpful && 'Was this review helpful to you?'}
            </Typography>

            <Button
              size="small"
              color="inherit"
              startIcon={
                <Icon icon={!isHelpful ? roundThumbUp : checkmarkFill} />
              }
              onClick={handleClickHelpful}
            >
              {isHelpful ? 'Helpful' : 'Thank'}(
              {fShortenNumber(!isHelpful ? helpful : helpful + 1)})
            </Button>
          </Box>
        </div>
      </ListItem>
    </>
  );
}

ReviewList.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string
};

function ReviewList({ product, className }) {
  const classes = useStyles();
  const { reviews } = product;

  return (
    <div className={clsx(classes.root, className)}>
      <List disablePadding>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Box>
    </div>
  );
}

export default ReviewList;
