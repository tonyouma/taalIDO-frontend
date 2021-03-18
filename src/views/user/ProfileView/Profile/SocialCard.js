import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify-icons/eva/twitter-fill';
import facebookFill from '@iconify-icons/eva/facebook-fill';
import linkedinFill from '@iconify-icons/eva/linkedin-fill';
import instagramFilled from '@iconify-icons/ant-design/instagram-filled';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Card, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  line: {
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: theme.spacing(2)
    }
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

SocialCard.propTypes = {
  profile: PropTypes.object,
  className: PropTypes.string
};

function SocialCard({ profile, className }) {
  const classes = useStyles();
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const SOCIALS = [
    {
      name: 'Linkedin',
      icon: (
        <Icon icon={linkedinFill} className={classes.icon} color="#006097" />
      ),
      href: linkedinLink
    },
    {
      name: 'Twitter',
      icon: (
        <Icon icon={twitterFill} className={classes.icon} color="#1C9CEA" />
      ),
      href: twitterLink
    },
    {
      name: 'Instagram',
      icon: (
        <Icon icon={instagramFilled} className={classes.icon} color="#D7336D" />
      ),
      href: instagramLink
    },
    {
      name: 'Facebook',
      icon: (
        <Icon icon={facebookFill} className={classes.icon} color="#1877F2" />
      ),
      href: facebookLink
    }
  ];

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader title="Social" />
      <CardContent>
        {SOCIALS.map((link) => (
          <div key={link.name} className={classes.line}>
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default SocialCard;
