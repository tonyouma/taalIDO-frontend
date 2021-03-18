import clsx from 'clsx';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import LazySize from 'src/components/LazySize';
import React, { useState, useRef } from 'react';
import { CarouselArrowsIndex } from 'src/components/Carousel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return (
    <LazySize
      alt={title}
      src={image.small}
      size={`${image.small} 600w, ${image.medium} 960w`}
      sx={{ width: '100%', height: 480 }}
    />
  );
}

CarouselBasic1.propTypes = {
  carousels: PropTypes.array.isRequired,
  className: PropTypes.string
};

function CarouselBasic1({ carousels, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? carousels.length - 1 : 0
  );

  const settings = {
    speed: 500,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      />
    </Card>
  );
}

export default CarouselBasic1;
