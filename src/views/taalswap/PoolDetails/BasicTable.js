import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import getMax from '../../../utils/getMax';
import moment from 'moment';
import Taalswap from 'src/utils/taalswap';
import Numbers from 'src/utils/Numbers';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

General.propTypes = {
  className: PropTypes.string
};

function General({ className, pool }) {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const context = useWeb3React();
  const { from } = useSelector((state) => state.talken);

  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [minSwapLevel, setMinSwapLevel] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

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

      const decimals = await taalswap
        .decimalsAsync()
        .catch((error) => console.log(error));

      await taalswap
        .nameAsync()
        .then((result) => setName(result))
        .catch((error) => console.log(error));
      await taalswap
        .totalSupplyAsync()
        .then((result) => setTotalSupply(result * Math.pow(10, decimals * -1)))
        .catch((error) => console.log(error));
      await taalswap
        .minimumRaise()
        .then((result) => setMinSwapLevel(result))
        .catch((error) => console.log(error));
    }

    setMax(getMax(pool.maxIndividuals, pool.tradeValue));
    setMin(pool.minIndividuals * pool.tradeValue);
  }, [pool, library]);

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  {/* 타이틀 삽입 */}
                  <Box sx={{ fontSize: 20 }}>
                    {t('taalswap.PoolInformation')}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.PoolStart')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {moment
                        .unix(pool.startDate)
                        .format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.MaxIndiv')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {Numbers.toFloat(max)} ETH
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.MinIndiv')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {min === 0 ? 'No minimum' : { min }} ETH
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.MinRaise')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {parseFloat(minSwapLevel).toLocaleString()}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.Access')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {pool.access}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  {/* 타이틀 삽입 */}
                  <Box sx={{ fontSize: 20 }}>
                    {t('taalswap.TokenInformation')}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.TokenName')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {name}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.TokenAddress')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {pool.tokenContractAddr}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.TotalSupply')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {Numbers.toFloat(totalSupply)}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.TokenHolders')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      6,223 (연동예정)
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t('taalswap.TokenTransfers')}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      35,576 (연동예정)
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default General;
