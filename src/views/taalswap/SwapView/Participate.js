import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import BasicTable from './BasicTable';
import CollapsibleTable from './CollapsibleTable';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import SortingSelecting from './SortingSelecting';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import Taalswap from 'src/utils/taalswap';
import { useWeb3React } from '@web3-react/core';
import moment from 'moment';
import {
  Box,
  Grid,
  Card,
  Container,
  CardHeader,
  Tabs,
  Tab
} from '@material-ui/core';

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

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const { library, account } = context;
  // let taalswap;

  // if (!!library && taalswap == undefined) {
  //   taalswap = new Taalswap({
  //     application: pool,
  //     account,
  //     library,
  //     tokenContractAddress: pool.tokenContractAddr,
  //     fixedContractAddress: pool.contractAddress
  //   });
  // }

  // console.log(taalswap);

  useEffect(async () => {
    try {
      if (!!account) {
        const taalswap = new Taalswap({
          application: pool,
          account,
          library,
          tokenContractAddress: pool.tokenContractAddr,
          fixedContractAddress: pool.contractAddress
        });

        await taalswap.nameAsync().then((result) => setName(result));
        await taalswap.tokensAllocated().then((result) => setAllocated(result));

        let tempList = [];
        const purchaseids = await taalswap.getAddressPurchaseIds({
          address: account
        });
        console.log(`purchaseids.length    : ${purchaseids.length}`);

        if (purchaseids.length > 0) {
          purchaseids.map(async (purchaseid) => {
            await taalswap
              .purchases({ id: purchaseid })
              .then((result) => {
                const newRow = {
                  purchaser: result.purchaser,
                  amount: result.amount * Math.pow(10, pool.decimals * -1),
                  ethAmount:
                    result.ethAmount * Math.pow(10, pool.decimals * -1),
                  timestamp: moment
                    .unix(result.timestamp)
                    .format('YYYY-MM-DD HH:mm'),
                  wasFinalized: result.wasFinalized
                };
                // console.log(newRow);
                // setPurchaseList(purchaseList.concat(newRow));
                // console.log('bbb');
                tempList = tempList.concat(newRow);
                setPurchaseList(tempList);
              })
              .catch((error) => console.log(error));
          });
        } else {
          console.log('stop');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [pool, account]);

  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center">
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
          {name} ({pool.symbol}) - {parseFloat(allocated).toLocaleString()}
          {/* <Box color="#ff0000" fontSize={10} marginLeft={1}>
            5.65% ↓
          </Box> */}
        </Box>

        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              {/* <CardHeader title="Basic Table" /> */}
              <BasicTable purchaseList={purchaseList} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Participate;
