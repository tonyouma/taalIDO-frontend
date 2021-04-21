import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { useWeb3React } from '@web3-react/core';
import baselineGroup from '@iconify-icons/ic/baseline-group';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import Taalswap from 'src/utils/taalswap';
import { alpha, useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import AnimatedNumber from 'react-animated-number';
import { useTranslation } from 'react-i18next';
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
    color: theme.palette.primary.main
  },
  isTrendingDown: {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.16)
  }
}));
// ----------------------------------------------------------------------

TotalPurchasers.propTypes = {
  className: PropTypes.string
};

function TotalPurchasers({ className, pool, ...other }) {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const context = useWeb3React();
  const { library, account } = context;

  const [participants, setParticipants] = useState(0);

  useEffect(async () => {
    if (!!library) {
      const taalswap = new Taalswap({
        application: pool,
        account,
        library
      });

      await taalswap
        .getBuyers()
        .then((result) => setParticipants(result.length))
        .catch((error) => console.log(error));
    }
  }, [library]);

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography marginBottom="20px" variant="subtitle2">
          {t('taalswap.TotalParticipants')}
        </Typography>

        <Typography variant="h3">
          <AnimatedNumber
            component="number"
            value={participants}
            style={{
              transition: '0.8s ease-out'
            }}
            duration={2000}
            formatValue={(n) => fNumber(n)}
          />
        </Typography>
      </Box>

      <Icon
        className={classes.trendingIcon}
        icon={baselineGroup}
        width={60}
        height={60}
      />
    </Card>
  );
}

export default TotalPurchasers;
