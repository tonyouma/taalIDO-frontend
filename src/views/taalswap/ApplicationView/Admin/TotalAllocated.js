import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import sharpMonetizationOn from '@iconify-icons/ic/sharp-monetization-on';
import { fNumber } from 'src/utils/formatNumber';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import Taalswap from 'src/utils/taalswap';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter
  },
  icon: {
    width: 120,
    height: 120,
    opacity: 0.12,
    position: 'absolute',
    right: theme.spacing(-3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.warning.dark,
      0
    )} 0%, ${alpha(theme.palette.warning.dark, 0.24)} 100%)`
  }
}));

// ----------------------------------------------------------------------

TotalAllocated.propTypes = {
  className: PropTypes.string
};

function TotalAllocated({ className, selectedItem, ...other }) {
  const classes = useStyles();

  const { i18n, t } = useTranslation();
  const context = useWeb3React();
  const [tokensAllocated, setTokensAllocated] = useState(0);

  const { library, account } = context;

  useEffect(async () => {
    if (!!library) {
      const taalswap = new Taalswap({
        application: selectedItem,
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
      <Box sx={{ ml: 3 }}>
        <Typography variant="h3"> {fNumber(tokensAllocated)}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Total Allocated
        </Typography>
      </Box>
      <Icon icon={sharpMonetizationOn} className={classes.icon} />
    </Card>
  );
}

export default TotalAllocated;
