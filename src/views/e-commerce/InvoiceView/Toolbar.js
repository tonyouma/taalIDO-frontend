import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import InvoicePDF from './InvoicePDF';
import React, { useState } from 'react';
import eyeFill from '@iconify-icons/eva/eye-fill';
import closeFill from '@iconify-icons/eva/close-fill';
import shareFill from '@iconify-icons/eva/share-fill';
import { DialogAnimate } from 'src/components/Animate';
import downloadFill from '@iconify-icons/eva/download-fill';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tooltip, IconButton, DialogActions } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { MButton } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(5),
    '& > *': {
      marginLeft: theme.spacing(1)
    }
  }
}));

// ----------------------------------------------------------------------

Toolbar.propTypes = {
  invoice: PropTypes.object.isRequired,
  className: PropTypes.string
};

function Toolbar({ invoice, className, ...other }) {
  const classes = useStyles();
  const [openPDF, setOpenPDF] = useState(false);

  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <MButton
        color="error"
        size="small"
        variant="contained"
        endIcon={<Icon icon={shareFill} />}
      >
        Share
      </MButton>

      <MButton
        color="info"
        size="small"
        variant="contained"
        onClick={handleOpenPreview}
        endIcon={<Icon icon={eyeFill} />}
      >
        Preview
      </MButton>

      <PDFDownloadLink
        document={<InvoicePDF invoice={invoice} />}
        fileName={`INVOICE-${invoice.id}`}
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) => (
          <LoadingButton
            size="small"
            pending={loading}
            variant="contained"
            pendingPosition="end"
            endIcon={<Icon icon={downloadFill} />}
          >
            Download
          </LoadingButton>
        )}
      </PDFDownloadLink>

      <DialogAnimate fullScreen open={openPDF}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.shadows[25].z8
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClosePreview}>
                <Icon icon={closeFill} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF invoice={invoice} />
            </PDFViewer>
          </Box>
        </Box>
      </DialogAnimate>
    </div>
  );
}

export default Toolbar;
