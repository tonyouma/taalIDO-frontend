import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
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
      {/* <Box // page 2-2 이미지 삭제
        component="img"
        alt={card.subscription}
        src={card.icon}
        sx={{ width: 80, height: 80, mt: 3 }}
      /> */}

      <Box sx={{ my: 0, width: '100%' }}>
        {/* page 2-3 레이아웃 재배치 */}
        {card.lists.map((item, index) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: item.isAvailable ? 'text.primary' : 'text.disabled',
              '&:not(:last-of-type)': { mb: 2 }
            }}
          >
            <Box>
              <Box
                sx={{
                  mr: 1.5
                }}
                fontWeight={'bold'}
                fontSize={20}
              >
                {item.text}
              </Box>
              <Box
                sx={{
                  mr: 1.0
                }}
                bgcolor="#cccccc"
                color="#666666"
              >
                {index == 1 ? 'http://token.co.kr' : 'texttexttext'}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default CandidateCard;
