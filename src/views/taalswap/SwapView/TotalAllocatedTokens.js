import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import sharpMonetizationOn from '@iconify-icons/ic/sharp-monetization-on';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import Taalswap from 'src/utils/taalswap';
import { useWeb3React } from '@web3-react/core';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import AnimatedNumber from 'react-animated-number';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: theme.palette.text.primary
  },
  trending: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5)
  },
  trendingIcon: {
    color: theme.palette.warning.darker
  },
  isTrendingDown: {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.16)
  }
}));

// ----------------------------------------------------------------------

TotalAllocatedTokens.propTypes = {
  className: PropTypes.string
};

function TotalAllocatedTokens({ className, pool, ...other }) {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const context = useWeb3React();
  const [tokensAllocated, setTokensAllocated] = useState(0);
  const { from } = useSelector((state) => state.talken);

  const { library, account } = context;

  useEffect(async () => {
    if (!!library || from) {
      let taalswap = null;
      if (!!library) {
        taalswap = new Taalswap({
          application: pool,
          account,
          library
        });
      } else {
        taalswap = new Taalswap({
          application: pool,
          notConnected: true
        });
      }

      await taalswap
        .tokensAllocated()
        .then((result) => {
          setTokensAllocated(parseInt(result));
        })
        .catch((error) => console.log(error));
    }
  }, [library]);

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography marginBottom="20px" variant="subtitle2">
          {t('taalswap.TotalAllocatedTokens')}
        </Typography>
        <Typography variant="h3">
          <Box display="flex" alignItems="baseline">
            <AnimatedNumber
              component="number"
              value={tokensAllocated}
              style={{
                transition: '0.8s ease-out'
              }}
              duration={2000}
              formatValue={(n) => `${fNumber(n)}`}
            />
            <Typography>/ {pool.tradeAmount}</Typography>
          </Box>
        </Typography>
      </Box>

      <Icon
        className={classes.trendingIcon}
        icon={sharpMonetizationOn}
        width={60}
        height={60}
      />
    </Card>
  );
}

export default TotalAllocatedTokens;
