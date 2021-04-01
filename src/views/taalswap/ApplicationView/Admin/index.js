import Page from 'src/components/Page';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  TextField,
  Typography
} from '@material-ui/core';
import { getPoolList } from '../../../redux/slices/pool';

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
    margin: '10px'
  },
  textField: {
    marginRight: '1rem'
  }
}));

const AdminView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { poolList } = useSelector((state) => state.pool);

  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState('');
  const [inputs, setInputs] = useState({
    allowanceAddress: '',
    allowanceAmount: '',
    fundAmount: '',
    whiteList: ''
  });

  const { allowanceAddress, allowanceAmount, fundAmount, whiteList } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleChange = (e) => {
    setSelectedPool(e.target.value);
  };

  const onClickAllowance = () => {
    console.log(
      `seleted pool : ${selectedPool}, addresss : ${allowanceAddress}, amount : ${allowanceAmount}`
    );
  };

  const onClickFund = () => {
    console.log(`seleted pool : ${selectedPool}, fundAmount : ${fundAmount}`);
  };

  const onClickWhiteList = () => {
    console.log(`seleted pool : ${selectedPool}, whiteList : ${whiteList}`);
  };

  useEffect(() => {
    dispatch(getPoolList());
    const newPools = poolList.filter(
      (pool) => pool.projectName !== undefined && pool.contractAddress !== ''
    );
    setPools(newPools);
  }, [poolList]);

  return (
    <Page
      title="New Application-Management | Minimal-UI"
      className={classes.root}
    >
      <Container>
        <HeaderDashboard heading="Admin" links={[{ name: 'settings' }]} />

        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Select Pool
            </Typography>
            <Box className={classes.box}>
              <TextField
                style={{ minWidth: '200px' }}
                name="selectePool"
                select
                defaultValue=""
                label="Pools"
                size="small"
                onChange={handleChange}
              >
                {pools.map((pool, index) => (
                  <option key={index} value={pool.projectName}>
                    {pool.projectName}
                  </option>
                ))}
              </TextField>
            </Box>

            <Typography variant="h6" component="h2">
              Allowance
            </Typography>
            <Box className={classes.box}>
              <TextField
                className={classes.textField}
                name="allowanceAmount"
                label="Amount"
                size="small"
                value={allowanceAmount}
                onChange={onChange}
              ></TextField>
              <Button
                variant="contained"
                size="medium"
                onClick={onClickAllowance}
              >
                Save
              </Button>
            </Box>

            <Typography variant="h6" component="h2">
              Fund
            </Typography>
            <Box className={classes.box}>
              <TextField
                className={classes.textField}
                name="fundAmount"
                label="Amount"
                size="small"
                value={fundAmount}
                onChange={onChange}
              ></TextField>
              <Button variant="contained" size="medium" onClick={onClickFund}>
                Save
              </Button>
            </Box>

            <Typography variant="h6" component="h2">
              WhiteList
            </Typography>
            <Box className={classes.box}>
              <TextField
                className={classes.textField}
                name="whiteList"
                label="WhiteList"
                size="small"
                value={whiteList}
                onChange={onChange}
              ></TextField>
              <Button
                variant="contained"
                size="medium"
                onClick={onClickWhiteList}
              >
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default AdminView;
