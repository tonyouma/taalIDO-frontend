import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Typography, Box } from '@material-ui/core';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
      padding: theme.spacing(5)
    }
  }
}));

// ----------------------------------------------------------------------

CandidateCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
  className: PropTypes.string
};

function CandidateCard({ card, index, className }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Typography variant="h2" sx={{ mx: 1 }}>
          Protocol
        </Typography>
      </Box>

      <Box
        component="img"
        alt={card.subscription}
        src={card.icon}
        sx={{ width: 80, height: 80, mt: 3 }}
      />

      <Box component="ul" sx={{ my: 5, width: '100%' }}>
        {card.lists.map((item) => (
          <Box
            key={item.text}
            component="li"
            sx={{
              display: 'flex',
              typography: 'body2',
              alignItems: 'center',
              color: item.isAvailable ? 'text.primary' : 'text.disabled',
              '&:not(:last-of-type)': { mb: 2 }
            }}
          >
            <Box component={Icon} sx={{ width: 20, height: 20, mr: 1.5 }} />
            {item.text}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default CandidateCard;
