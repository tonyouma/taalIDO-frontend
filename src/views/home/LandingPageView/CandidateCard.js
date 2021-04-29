import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box, Link } from '@material-ui/core';
import getMax from '../../../utils/getMax';
import EllipsisText from 'react-text-overflow-middle-ellipsis';
import Numbers from 'src/utils/Numbers';
import { useTranslation } from 'react-i18next';

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
  },
  websiteUrl: {
    // '& a': {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      // textDecoration: 'underline'
      // textShadow: '0 0 24px'
    }
    // }
  },
  tokenAddress: {}
}));

// ----------------------------------------------------------------------

CandidateCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
  className: PropTypes.string
};

function CandidateCard({ pool, index, className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={clsx(classes.root, className)} id="cardbox_wrap">
      <Box sx={{ my: 0, width: '100%' }}>
        {/* Project Name */}
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
                mr: 1.5,
                color: '#637381'
              }}
              fontWeight={'500'}
              fontSize={14}
            >
              {t('taalswap.ProjectName')}
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            <EllipsisText
              text={pool.projectName}
              className={'centerText'}
            ></EllipsisText>
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
          <Box className="candidate_text">
            <Box
              sx={{
                mr: 1.5,
                color: '#637381'
              }}
              fontWeight={'500'}
              fontSize={14}
            >
              {t('taalswap.WebsiteURL')}
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            <Link
              className={classes.websiteUrl}
              href={pool.websiteUrl}
              target="_blank"
            >
              {pool.websiteUrl}
            </Link>
          </Box>
        </Box>

        {/* WhitePager/LitePaper */}
        {/* <Box
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
        </Box> */}

        {/* Project Introduction */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          <Box className="candidate_text">
            <Box
              sx={{
                mr: 1.5,
                color: '#637381'
              }}
              fontWeight={'500'}
              fontSize={14}
            >
              {t('taalswap.Category')}
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            {pool.category}
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
          <Box className="candidate_text">
            <Box
              sx={{
                mr: 1.5,
                color: '#637381'
              }}
              fontWeight={'500'}
              fontSize={14}
            >
              {t('taalswap.MaxAllocationPerWallet')}
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            {Numbers.toFloat(getMax(pool.maxIndividuals, pool.tradeValue))}
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
          <Box className="candidate_text">
            <Box
              sx={{
                mr: 1.5,
                color: '#637381'
              }}
              fontWeight={'500'}
              fontSize={14}
            >
              {t('taalswap.TotalSupply')}
            </Box>
            <Box
              sx={{
                mr: 1.0
              }}
            />
            {pool.tradeAmount}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default CandidateCard;
