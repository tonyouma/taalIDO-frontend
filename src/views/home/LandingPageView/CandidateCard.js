import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Box } from '@material-ui/core';
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
  const { i18n, t } = useTranslation();

  return (
    <Card className={clsx(classes.root, className)}>
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
                mr: 1.5
              }}
              fontWeight={'bold'}
              fontSize={20}
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
          <Box>
            <Box
              sx={{
                mr: 1.5
              }}
              fontWeight={'bold'}
              fontSize={20}
            >
              {t('taalswap.WebsiteURL')}
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
          <Box>
            <Box
              sx={{
                mr: 1.5
              }}
              fontWeight={'bold'}
              fontSize={20}
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
          <Box>
            <Box
              sx={{
                mr: 1.5
              }}
              fontWeight={'bold'}
              fontSize={20}
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
          <Box>
            <Box
              sx={{
                mr: 1.5
              }}
              fontWeight={'bold'}
              fontSize={20}
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
