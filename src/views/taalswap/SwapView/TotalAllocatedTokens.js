import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import Taalswap from 'src/utils/taalswap';
import { useWeb3React } from '@web3-react/core';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import AnimatedNumber from 'react-animated-number';
import sharpMonetizationOn from '@iconify-icons/ic/sharp-monetization-on';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: theme.palette.warning.darker
    // backgroundColor: theme.palette.warning.lighter

    // height: '160px'
  },
  trending: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5)
  },
  trendingIcon: {
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.16)
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

  const { library, account } = context;

  useEffect(async () => {
    if (!!library) {
      const taalswap = new Taalswap({
        application: pool,
        account,
        library
      });

      await taalswap
        .tokensAllocated()
        .then((result) => {
          console.log(result);
          setTokensAllocated(result);
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
          <AnimatedNumber
            // component="number"
            value={tokensAllocated}
            style={{
              transition: '0.8s ease-out'
              // fontSize: 48,
              // transitionProperty: 'background-color, color, opacity'
            }}
            // frameStyle={(perc) =>
            //   perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
            // }
            duration={1000}
            formatValue={(n) => fNumber(n)}
          />
        </Typography>
      </Box>

      <Icon icon={sharpMonetizationOn} width={60} height={60} />
    </Card>
  );
}

export default TotalAllocatedTokens;
