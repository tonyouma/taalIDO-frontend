import clsx from 'clsx';
import Overview from './Overview';
import PropTypes from 'prop-types';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Collapse } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

Review.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string
};

function Review({ product, className }) {
  const classes = useStyles();
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Overview product={product} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <ReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>

      <ReviewList product={product} />
    </div>
  );
}

export default Review;
