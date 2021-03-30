import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box } from '@material-ui/core';

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
  },
  box: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

// ----------------------------------------------------------------------

CandidateCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
  className: PropTypes.string
};

function CandidateCard({ pool, index, className }) {
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
        {/* {card.lists.map((item, index) => (
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
              />
              {index == 1 ? 'http://token.co.kr' : 'texttexttext'}
            </Box>
          </Box>
        ))} */}

        {/* Token Contract Address */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          <Box
            className={clsx(classes.box, className)}
            // title={pool.tokenContractAddr}
          >
            <Box
              sx={{
                mr: 1.5
              }}
              fontWeight={'bold'}
              fontSize={20}
            >
              Token Contract Address
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            {!!pool.tokenContractAddr && pool.tokenContractAddr}
          </Box>
        </Box>

        {/* Website URL */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
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
              Website URL
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            {!!pool.websiteUrl && pool.websiteUrl}
          </Box>
        </Box>

        {/* WhitePager/LitePaper */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
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
              WhitePager/LitePaper
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            연동 필요
          </Box>
        </Box>

        {/* Project Introduction */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
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
              Project Introduction
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            연동 필요
          </Box>
        </Box>

        {/* Max.Allocation per Wallet */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
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
              Max.Allocation per Wallet
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            연동 필요
          </Box>
        </Box>

        {/* Total Supply */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
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
              Total Supply
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            연동 필요
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default CandidateCard;
