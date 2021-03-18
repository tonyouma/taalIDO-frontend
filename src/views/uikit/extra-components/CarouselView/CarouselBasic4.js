import clsx from 'clsx';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import LazySize from 'src/components/LazySize';
import { CarouselArrowsBasic2 } from 'src/components/Carousel';
import moreHorizontalFill from '@iconify-icons/eva/more-horizontal-fill';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, Typography, CardContent } from '@material-ui/core';
import { MIconButton } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

CarouselBasic4.propTypes = {
  carousels: PropTypes.array.isRequired,
  className: PropTypes.string
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return (
    <Box sx={{ position: 'relative', zIndex: 0 }}>
      <LazySize
        alt={title}
        src={image.small}
        size={`${image.small} 600w, ${image.medium} 960w`}
        sx={{ width: '100%', height: 480 }}
      />

      <CardContent
        sx={{
          bottom: 0,
          width: '100%',
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          color: 'common.white',
          backdropFilter: 'blur(8px)',
          justifyContent: 'space-between',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          flexDirection: (theme) =>
            theme.direction === 'rtl' ? 'row-reverse' : 'row',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
        }}
      >
        <Typography variant="h6">{item.title}</Typography>
        <MIconButton color="white">
          <Icon icon={moreHorizontalFill} />
        </MIconButton>
      </CardContent>
    </Box>
  );
}

function CarouselBasic4({ carousels, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    speed: 500,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: Boolean(theme.direction !== 'rtl'),
    rtl: Boolean(theme.direction === 'rtl')
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Slider ref={carouselRef} {...settings}>
        {carousels.map((item) => (
          <CarouselItem key={item.title} item={item} />
        ))}
      </Slider>
      <CarouselArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </Card>
  );
}

export default CarouselBasic4;
