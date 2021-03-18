import clsx from 'clsx';
import React from 'react';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider';
import { varFadeInUp, MotionInView } from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      paddingLeft: theme.spacing(10)
    }
  },
  section: {
    cursor: 'pointer',
    overflow: 'hidden',
    marginBottom: theme.spacing(10),
    boxShadow: theme.shadows[25].z16,
    borderRadius: theme.shape.borderRadiusMd
  },
  handleControl: {
    width: 3,
    height: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
    boxShadow: `-16px 0 32px 4px ${theme.palette.grey[500]}`
  },
  circle: {
    width: 23,
    zIndex: 9,
    height: 23,
    borderRadius: '50%',
    position: 'absolute',
    background: theme.palette.gradients.error,
    boxShadow: 'inset -2px -2px 4px 0 rgba(0, 0, 0, 0.24)'
  },
  circleLarge: {
    zIndex: 8,
    width: 29,
    height: 29,
    boxShadow: theme.shadows[24],
    background: theme.palette.common.white
  }
}));

// ----------------------------------------------------------------------

function HandleControl() {
  const classes = useStyles();
  return (
    <div className={classes.handleControl}>
      <span className={classes.circle} />
      <span className={clsx(classes.circle, classes.circleLarge)} />
    </div>
  );
}

SectionItem.propTypes = {
  item: PropTypes.object
};

function SectionItem({ item }) {
  const classes = useStyles();
  const { title, href, leftImage, rightImage } = item;

  return (
    <>
      <Hidden mdUp>
        <Typography variant="h4" sx={{ mb: 5, textTransform: 'capitalize' }}>
          {title}
        </Typography>
      </Hidden>

      {leftImage && (
        <MotionInView variants={varFadeInUp}>
          <Element name={href} className={classes.section}>
            <ReactCompareSlider
              boundsPadding={20}
              handle={<HandleControl />}
              itemOne={
                <ReactCompareSliderImage
                  alt={`${title} light`}
                  src="/static/images/placeholder.svg"
                  srcSet={`${leftImage.small} 600w, ${leftImage.medium} 960w, ${leftImage.large} 1280w`}
                  loading="lazy"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  alt={`${title} dark`}
                  src="/static/images/placeholder.svg"
                  srcSet={`${rightImage.small} 600w, ${rightImage.medium} 960w, ${rightImage.large} 1280w`}
                  loading="lazy"
                />
              }
            />
          </Element>
        </MotionInView>
      )}
    </>
  );
}

Sections.propTypes = {
  links: PropTypes.array.isRequired,
  className: PropTypes.string
};

function Sections({ links, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {links.map((item) => (
        <div key={item.title}>
          <SectionItem item={item} />
          {item.sublinks &&
            orderBy(item.sublinks, ['title'], ['asc']).map((item) => (
              <SectionItem key={item.title} item={item} />
            ))}
        </div>
      ))}
    </div>
  );
}

export default Sections;
