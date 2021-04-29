import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import BasicTable from './BasicTable';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import { makeStyles } from '@material-ui/core/styles';
import Taalswap from 'src/utils/taalswap';
import { useWeb3React } from '@web3-react/core';
import moment from 'moment';
import { Grid, Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
  {
    value: 'BasicTable',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <BasicTable />
  }
];
const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function Participate({ pool }) {
  const classes = useStyles();
  const context = useWeb3React();

  const [currentTab, setCurrentTab] = useState('BasicTable');
  const [name, setName] = useState('');
  const [allocated, setAllocated] = useState(0);
  const [purchaseList, setPurchaseList] = useState([]);
  const { library, account } = context;
  const { from } = useSelector((state) => state.talken);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(async () => {
    try {
      // if (!!account || from) {
      //   console.log(from);
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

      // const taalswap = new Taalswap({
      //   application: pool,
      //   account,
      //   library,
      //   tokenContractAddress: pool.tokenContractAddr,
      //   fixedContractAddress: pool.contractAddress
      // });

      await taalswap
        .nameAsync()
        .then((result) => setName(result))
        .catch((error) => console.log(error));
      await taalswap
        .tokensAllocated()
        .then((result) => setAllocated(result))
        .catch((error) => console.log(error));

      let tempList = [];
      const purchaseids = await taalswap
        .getPurchaseIds()
        .catch((error) => console.log(error));

      if (purchaseids.length > 0) {
        purchaseids.map(async (purchaseid) => {
          await taalswap
            .purchases({ id: purchaseid })
            .then((result) => {
              const newRow = {
                purchaser: result.purchaser,
                amount: result.amount * Math.pow(10, pool.decimals * -1),
                ethAmount: result.ethAmount * Math.pow(10, pool.decimals * -1),
                timestamp: moment
                  .unix(result.timestamp)
                  .format('YYYY-MM-DD HH:mm'),
                wasFinalized: result.wasFinalized
              };

              tempList = tempList.concat(newRow);
              setPurchaseList(tempList);
            })
            .catch((error) => console.log(error));
        });
      }
      // }
    } catch (error) {
      console.log(error);
    }
  }, [pool, account]);

  return (
    <Page title="Participants | TaalSwap" className={classes.root}>
      {/* <Container maxWidth="lg"> */}
      {/* <Box display="flex" alignItems="center">
        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginRight: 1
          }}
          component="img"
          alt="logo"
          src={'/static/icons/wallet_icon01.png'}
          height={30}
        />
        {name} ({pool.symbol}) - {parseFloat(allocated).toLocaleString()} */}
      {/* <Box color="#ff0000" fontSize={10} marginLeft={1}>
            5.65% ↓
          </Box> */}
      {/* </Box> */}

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Card>
            {/* <CardHeader title="Basic Table" /> */}
            <BasicTable purchaseList={purchaseList} symbol={pool.symbol} />
          </Card>
        </Grid>
      </Grid>
      {/* </Container> */}
    </Page>
  );
}

export default Participate;
