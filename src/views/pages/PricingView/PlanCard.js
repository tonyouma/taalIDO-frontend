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

PlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
  className: PropTypes.string
};

function PlanCard({ card, index, className }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      {index === 1 && (
        <MLabel
          color="info"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute'
          }}
        >
          POPULAR
        </MLabel>
      )}

      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {card.subscription}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        {index === 1 || index === 2 ? (
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            $
          </Typography>
        ) : (
          ''
        )}
        <Typography variant="h2" sx={{ mx: 1 }}>
          {card.price === 0 ? 'Free' : card.price}
        </Typography>
        {index === 1 || index === 2 ? (
          <Typography
            gutterBottom
            component="span"
            variant="subtitle2"
            sx={{
              alignSelf: 'flex-end',
              color: 'text.secondary'
            }}
          >
            /mo
          </Typography>
        ) : (
          ''
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize'
        }}
      >
        {card.caption}
      </Typography>

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
            <Box
              component={Icon}
              icon={checkmarkFill}
              sx={{ width: 20, height: 20, mr: 1.5 }}
            />
            {item.text}
          </Box>
        ))}
      </Box>

      <Button
        to={PATH_APP.root}
        fullWidth
        size="large"
        variant="contained"
        disabled={index === 0}
        component={RouterLink}
      >
        {card.labelAction}
      </Button>
    </Card>
  );
}

export default PlanCard;
