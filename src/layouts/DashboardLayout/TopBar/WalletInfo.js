import React, { useState } from 'react';
import {
  Button,
  Box,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Card
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { formatEther } from '@ethersproject/units';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import LinkIcon from '@material-ui/icons/Link';
import { useSnackbar } from 'notistack';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import WalletDialog from 'src/views/taalswap/Components/WalletDialog';
import './App.css';
import { infuraChainId } from 'src/config';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '400px',
    height: '40px',
    margin: 1,
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: 13,
    cursor: 'pointer'
    // border: '1px solid red'
  },
  icon: {
    marginLeft: '5px',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.72
    }
  },
  accountDialogContentBox: {
    bgcolor: theme.palette.background.paper,
    // borderColor: theme.palette.primary,
    borderColor: 'green',
    m: 1,
    border: 1
  }
}));

const WalletInfo = ({ walletAddress, balance, disconnect }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const context = useWeb3React();
  const { deactivate, activate } = context;
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  const onClickCopy = () => {
    try {
      // navigator.clipboard.writeText(walletAddress);
      if (navigator.clipboard && window.isSecureContext && false) {
        navigator.clipboard.writeText(walletAddress);
      } else {
        let textArea = document.createElement('textarea');
        textArea.value = walletAddress;
        console.log(textArea.value);
        // make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        new Promise((res, rej) => {
          // here the magic happens
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
        });
      }
      enqueueSnackbar('copied!!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('failed!!', { variant: 'error' });
    }
  };

  const ethStr =
    balance !== null ? parseFloat(formatEther(balance)).toFixed(2) : '0';
  // const talStr = talBalance !== null ? parseFloat(talBalance).toFixed(2) : '0';
  const n = walletAddress.length;
  const walletStr =
    walletAddress.substr(0, 5) + '...' + walletAddress.substr(n - 5, n);

  const handleCloseAccount = () => {
    setIsOpenAccount(false);
  };

  const handleCloseWallet = () => {
    setIsOpenWallet(false);
  };

  return (
    <React.Fragment>
      <Box className={classes.root} onClick={() => setIsOpenAccount(true)}>
        <Typography id="token_num">{walletStr}</Typography>
        <img src="/static/icons/file_icon.png" className="file_icon" />
      </Box>
      <Box>
        <Dialog
          open={isOpenAccount}
          onClose={handleCloseAccount}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
        >
          <DialogTitle
            className={classes.dialogTitle}
            id="customized-dialog-title"
            onClose={handleCloseAccount}
          >
            {t('taalswap.Account')}
          </DialogTitle>
          <DialogContent dividers>
            <Card
              sx={{
                bgcolor: theme.palette.background.paper,
                // borderColor: theme.palette.text.secondary,

                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 0.5,
                paddingBottom: 2,
                border: '1',
                borderColor: 'red',
                // borderRadius: 5,
                width: '400px'
                // height: '5rem'
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="caption">
                  {i18n.language === 'en'
                    ? `${t('taalswap.ConnectedInfo')} MetaMask`
                    : `MetaMask${t('taalswap.ConnectedInfo')}`}
                </Typography>
                <Box>
                  <Button
                    size="small"
                    onClick={async () => {
                      await deactivate();
                      window.localStorage.removeItem('chainId');
                    }}
                  >
                    {t('taalswap.Disconnect')}
                  </Button>
                  <Button size="small" onClick={() => setIsOpenWallet(true)}>
                    {t('taalswap.Change')}
                  </Button>
                </Box>
              </Box>
              <Box marginTop="1rem">
                <Typography variant="h5">{walletStr}</Typography>
              </Box>
              <Box display="flex" justifyContent="flex-start" marginTop="1rem">
                <Box
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                  onClick={onClickCopy}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                  <Typography variant="caption" marginLeft="0.2rem">
                    {t('taalswap.CopyAddress')}
                  </Typography>
                </Box>
                <Box
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: '1.5rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const url =
                      infuraChainId === 'mainnet'
                        ? `https://etherscan.io/address/${walletAddress}`
                        : `https://${infuraChainId}.etherscan.io/address/${walletAddress}`;
                    window.open(url, '_blank');
                  }}
                >
                  <LinkIcon fontSize="small" />
                  <Typography variant="caption" marginLeft="0.2rem">
                    {t('taalswap.ViewOnEthScan')}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </DialogContent>
        </Dialog>
      </Box>
      <Box>
        <WalletDialog
          isOpenModal={isOpenWallet}
          handleCloseModal={handleCloseWallet}
          activate={activate}
        />
      </Box>
    </React.Fragment>
  );
};

export default WalletInfo;
