import clsx from 'clsx';
import React from 'react';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';

  return {
    root: {
      top: 120,
      width: 280,
      zIndex: 99,
      flexShrink: 0,
      position: 'sticky',
      padding: theme.spacing(5),
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: theme.palette.grey[isLight ? 200 : 800]
    },
    list: {
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2)
      }
    },
    link: {
      display: 'block',
      cursor: 'pointer',
      textTransform: 'capitalize',
      color: theme.palette.text.secondary,
      '&:hover': { color: theme.palette.primary.main }
    },
    linkRoot: {
      ...theme.typography.subtitle1
    },
    linkSub: {
      ...theme.typography.subtitle2,
      marginTop: theme.spacing(1.5),
      paddingLeft: theme.spacing(4.5)
    },
    linkActive: {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightBold
    }
  };
});

// ----------------------------------------------------------------------

function NavItem({ link, index, className }) {
  const classes = useStyles();
  const { title, href } = link;

  return (
    <ScrollLink
      to={href}
      spy={true}
      smooth={true}
      offset={-200}
      duration={500}
      className={className}
      activeClass={classes.linkActive}
    >
      {index && `0${index} -`} {title}
    </ScrollLink>
  );
}

NavBar.propTypes = {
  links: PropTypes.array.isRequired
};

function NavBar({ links, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {links.map((link, index) => (
        <div key={link.title} className={classes.list}>
          <NavItem
            link={link}
            index={index + 1}
            className={clsx(classes.link, classes.linkRoot)}
          />
          {link.sublinks &&
            orderBy(link.sublinks, ['title'], ['asc']).map((link) => (
              <NavItem
                link={link}
                key={link.title}
                className={clsx(classes.link, classes.linkSub)}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default NavBar;
