import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  Link,
  IconButton,
  Button,
  Hidden
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
// import { MBreadcrumbs } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5)
  },
  subtitle: {
    [theme.breakpoints.down('sm')]: {
      // fontSize: '0.9rem',
      // maxWidth: '100px',
      // border: '1px solid red'
    }
  }
}));

// ----------------------------------------------------------------------

HeaderDashboard.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  className: PropTypes.string
};

function HeaderDashboard({
  links,
  action,
  heading,
  moreLink = '' || [],
  className,
  subTitle,
  url,
  ...other
}) {
  const classes = useStyles();
  const [walletAddress, setWalletAddress] = useState('');

  const handleClickUrl = () => {
    console.log(url);
  };

  useEffect(() => {
    if (subTitle !== undefined) {
      const n = subTitle.length;
      const shortAddress =
        subTitle.substr(0, 15) + '...' + subTitle.substr(n - 15, n);

      setWalletAddress(shortAddress);
    }
  }, []);

  return (
    <Box className={clsx(classes.root, className)}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>

          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Hidden smDown>
              <Typography
                className={classes.subtitle}
                variant="body4"
                color="#888888"
              >
                {subTitle}
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography
                className={classes.subtitle}
                variant="body4"
                color="#888888"
              >
                {walletAddress}
              </Typography>
            </Hidden>

            {url && (
              <Box style={{ width: '50px' }}>
                <IconButton variant="link" href={url} target="_blank">
                  <LinkIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}

export default HeaderDashboard;
