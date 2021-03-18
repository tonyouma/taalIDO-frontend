import clsx from 'clsx';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import LazySize from 'src/components/LazySize';
import React, { useState, useRef } from 'react';
import { CarouselArrowsIndex } from 'src/components/Carousel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, title, description } = item;

  return (
    <>
      <LazySize
        alt={title}
        src={image.small}
        size={`${image.small} 600w, ${image.medium} 960w`}
        sx={{ width: '100%', height: 370 }}
      />

      <CardContent sx={{ textAlign: 'left' }}>
        <Typography variant="h6" noWrap gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </CardContent>
    </>
  );
}

CarouselBasic2.propTypes = {
  carousels: PropTypes.array.isRequired,
  className: PropTypes.string
};

function CarouselBasic2({ carousels, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(2);

  const settings = {
    speed: 500,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentIndex,
    fade: Boolean(theme.direction !== 'rtl'),
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next)
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

      <CarouselArrowsIndex
        index={currentIndex}
        total={carousels.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{ bottom: '122px !important' }}
      />
    </Card>
  );
}

export default CarouselBasic2;
