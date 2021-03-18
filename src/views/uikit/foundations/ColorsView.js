import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import copyFill from '@iconify-icons/eva/copy-fill';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HeaderDashboard } from 'src/layouts/Common';
import { useTheme, makeStyles, hexToRgb } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Tooltip,
  Container,
  Typography,
  IconButton
} from '@material-ui/core';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'info', 'success', 'warning', 'error'];
const COLORS_VARIATIONS = ['lighter', 'light', 'main', 'dark', 'darker'];
const GREY_VARIATIONS = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
];

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1.5, -1.5, 0)
  },
  card: {
    width: '100%',
    position: 'relative',
    margin: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: { width: 'calc((100%/2) - 24px)' },
    [theme.breakpoints.up('md')]: { width: 'calc((100%/4) - 24px)' },
    [theme.breakpoints.up('lg')]: { width: 'calc((100%/5) - 24px)' }
  }
}));

// ----------------------------------------------------------------------

function ColorCard({ hexColor, variation, onCopy }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.card}>
      <CopyToClipboard text={hexColor} onCopy={onCopy}>
        <Tooltip title="Copy">
          <IconButton
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
              color: theme.palette.getContrastText(hexColor)
            }}
          >
            <Icon icon={copyFill} width={20} height={20} />
          </IconButton>
        </Tooltip>
      </CopyToClipboard>

      <Box sx={{ bgcolor: hexColor, paddingTop: '56%' }} />

      <Box sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
          {variation}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, mb: 1 }}>
          <Typography
            variant="overline"
            sx={{ width: 56, color: 'text.secondary' }}
          >
            Hex
          </Typography>
          <Typography variant="body2">{hexColor}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="overline"
            sx={{ width: 56, color: 'text.secondary' }}
          >
            Rgb
          </Typography>
          <Typography variant="body2">
            {hexToRgb(hexColor).replace('rgb(', '').replace(')', '')}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

function ColorsView() {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [, setState] = useState(null);

  const onCopy = (color) => {
    setState(color);
    if (color) {
      enqueueSnackbar(`Copied ${color}`, { variant: 'success' });
    }
  };

  return (
    <Page title="Colors-Foundations | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Colors"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Foundations', href: PATH_APP.foundations.root },
            { name: 'Colors' }
          ]}
          moreLink={[
            'https://next.material-ui.com/customization/color',
            'https://colors.eva.design'
          ]}
        />

        {COLORS.map((color) => (
          <Box key={color} sx={{ mb: 5 }}>
            <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
              {color}
            </Typography>

            <div className={classes.wrapper}>
              {COLORS_VARIATIONS.map((variation) => (
                <ColorCard
                  key={variation}
                  variation={variation}
                  hexColor={theme.palette[color][variation]}
                  onCopy={() => onCopy(theme.palette[color][variation])}
                />
              ))}
            </div>
          </Box>
        ))}

        <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
          Grey
        </Typography>
        <div className={classes.wrapper}>
          {GREY_VARIATIONS.map((variation) => (
            <ColorCard
              key={variation}
              variation={variation}
              hexColor={theme.palette.grey[variation]}
              onCopy={() => onCopy(theme.palette.grey[variation])}
            />
          ))}
        </div>
      </Container>
    </Page>
  );
}

export default ColorsView;
