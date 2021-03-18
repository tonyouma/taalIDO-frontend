import clsx from 'clsx';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import LazySize from 'src/components/LazySize';
import { Link as RouterLink } from 'react-router-dom';
import { CarouselArrowsBasic2 } from 'src/components/Carousel';
import arrowForwardFill from '@iconify-icons/eva/arrow-forward-fill';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Box, Link, Typography, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    position: 'relative',
    '&:before, &:after': {
      top: 0,
      left: 0,
      zIndex: 8,
      width: 48,
      content: "''",
      height: '100%',
      display: 'none',
      position: 'absolute',
      backgroundImage:
        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
      [theme.breakpoints.up('480')]: {
        display: 'block'
      }
    },
    '&:after': {
      right: 0,
      left: 'auto',
      transform: 'scaleX(-1)'
    }
  }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return (
    <Paper
      sx={{
        mx: 1,
        borderRadius: 2,
        overflow: 'hidden',
        paddingTop: 'calc(16 /9 * 100%)',
        position: 'relative',
        '&:hover img': {
          width: '120%',
          height: '120%',
          transition: (theme) => theme.transitions.create('all')
        }
      }}
    >
      <LazySize
        alt={title}
        src={image.small}
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
      />
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          backgroundImage: (theme) =>
            `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(
              theme.palette.grey[900],
              0
            )} 100%)`
        }}
      >
        <Typography variant="h4" paragraph>
          {title}
        </Typography>
        <Link
          to="#"
          color="inherit"
          variant="overline"
          component={RouterLink}
          sx={{
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            transition: (theme) => theme.transitions.create('opacity'),
            '&:hover': { opacity: 1 }
          }}
        >
          learn More
          <Box
            component={Icon}
            icon={arrowForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </Link>
      </CardContent>
    </Paper>
  );
}

CarouselCenterMode.propTypes = {
  carousels: PropTypes.array.isRequired,
  className: PropTypes.string
};

function CarouselCenterMode({ carousels, className, ...other }) {
  const classes = useStyles();
  const carouselRef = useRef();
  const theme = useTheme();

  const settings = {
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '60px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Slider ref={carouselRef} {...settings}>
        {carousels.map((item) => (
          <CarouselItem key={item.title} item={item} />
        ))}
      </Slider>
      <CarouselArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </div>
  );
}

export default CarouselCenterMode;
