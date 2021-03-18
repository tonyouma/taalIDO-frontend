import clsx from 'clsx';
import React from 'react';
import { sumBy } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as ScrollLink } from 'react-scroll';
import { fShortenNumber } from 'src/utils/formatNumber';
import edit2Fill from '@iconify-icons/eva/edit-2-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Rating,
  Button,
  Typography,
  LinearProgress
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    '&:nth-child(2)': {
      [theme.breakpoints.up('md')]: {
        borderLeft: `solid 1px ${theme.palette.divider}`,
        borderRight: `solid 1px ${theme.palette.divider}`
      }
    }
  },
  rating: {
    marginBottom: theme.spacing(1)
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1.5)
    }
  },
  progress: {
    flexGrow: 1,
    margin: theme.spacing(0, 2),
    backgroundColor: theme.palette.divider
  }
}));

// ----------------------------------------------------------------------

function PercentProgress({ star, total }) {
  const classes = useStyles();
  const { name, starCount, reviewCount } = star;
  return (
    <div className={classes.row}>
      <Typography variant="body2">{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={(starCount / total) * 100}
        className={classes.progress}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {fShortenNumber(reviewCount)}
      </Typography>
    </div>
  );
}

Overview.propTypes = {
  product: PropTypes.object,
  onOpen: PropTypes.func,
  className: PropTypes.string
};

function Overview({ product, onOpen, className }) {
  const classes = useStyles();
  const { totalRating, totalReview, ratings } = product;

  const total = sumBy(ratings, function (star) {
    return star.starCount;
  });

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container>
        <Grid item xs={12} md={4} className={classes.box}>
          <Typography variant="subtitle1" gutterBottom>
            Average rating
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
            {totalRating}/5
          </Typography>
          <Rating
            readOnly
            value={totalRating}
            precision={0.1}
            className={classes.rating}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(totalReview)}
            &nbsp;reviews)
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} className={classes.box}>
          <Box sx={{ width: '100%' }}>
            {ratings
              .slice(0)
              .reverse()
              .map((rating) => (
                <PercentProgress
                  key={rating.name}
                  star={rating}
                  total={total}
                />
              ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4} className={classes.box}>
          <ScrollLink
            to="move_add_review"
            spy={true}
            smooth={true}
            offset={-200}
          >
            <Button
              size="large"
              onClick={onOpen}
              variant="outlined"
              startIcon={<Icon icon={edit2Fill} />}
            >
              Write your review
            </Button>
          </ScrollLink>
        </Grid>
      </Grid>
    </div>
  );
}

export default Overview;
