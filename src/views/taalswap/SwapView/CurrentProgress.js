import clsx from 'clsx';

import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import baselineHistory from '@iconify-icons/ic/baseline-history';
import AnimatedNumber from 'react-animated-number';
import { useWeb3React } from '@web3-react/core';
import Taalswap from 'src/utils/taalswap';
import getProgressValue from 'src/utils/getProgressValue';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: theme.palette.info.darker
    // backgroundColor: theme.palette.info.lighter

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

CurrentProgress.propTypes = {
  className: PropTypes.string
};

function CurrentProgress({ className, pool, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const context = useWeb3React();
  const [progressValue, setProgressValue] = useState(0);

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
          setProgressValue(getProgressValue(result, pool.tradeAmount));
        })
        .catch((error) => console.log(error));
    }
  }, [library]);

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography marginBottom="20px" variant="subtitle2">
          Current Progress
        </Typography>

        <Typography variant="h3">
          <AnimatedNumber
            // component="number"
            value={progressValue}
            style={{
              transition: '0.8s ease-out'
              // fontSize: 48,
              // transitionProperty: 'background-color, color, opacity'
            }}
            // frameStyle={(perc) =>
            //   perc === 100 ? {} : { backgroundColor: '#ffeb3b' }
            // }
            duration={1000}
            formatValue={(n) => `${fNumber(n)} %`}
          />
        </Typography>
      </Box>

      <Icon icon={baselineHistory} width={60} height={60} />
    </Card>
  );
}

export default CurrentProgress;
