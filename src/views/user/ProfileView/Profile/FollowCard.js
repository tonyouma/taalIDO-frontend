import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { fNumber } from 'src/utils/formatNumber';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Divider, Typography, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

FollowCard.propTypes = {
  profile: PropTypes.object,
  className: PropTypes.string
};

function FollowCard({ profile, className }) {
  const classes = useStyles();
  const { follower, following } = profile;

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{fNumber(follower)}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Follower
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{fNumber(following)}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Following
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default FollowCard;
