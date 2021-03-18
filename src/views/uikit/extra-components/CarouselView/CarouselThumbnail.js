import clsx from 'clsx';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import LazySize from 'src/components/LazySize';
import React, { useState, useRef, useEffect } from 'react';
import { CarouselArrowsIndex } from 'src/components/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const useStyles = makeStyles((theme) => {
  const isRTL = theme.direction === 'rtl';

  return {
    root: {
      '& .slick-slide': {
        float: isRTL ? 'right' : 'left'
      }
    }
  };
});

// ----------------------------------------------------------------------

LargeItem.propTypes = {
  item: PropTypes.object
};

function LargeItem({ item }) {
  const { image, title } = item;

  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: {
          xs: '100%',
          md: '50%'
        }
      }}
    >
      <LazySize
        alt={title}
        src={image.small}
        size={`${image.small} 600w, ${image.medium} 960w`}
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
      />
    </Box>
  );
}

ThumbnailItem.propTypes = {
  item: PropTypes.object
};

function ThumbnailItem({ item }) {
  const { image, title } = item;

  return (
    <LazySize
      alt={title}
      src={image.thumb}
      sx={{
        mx: 1,
        opacity: 0.48,
        borderRadius: 1.5,
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.72,
          transition: (theme) => theme.transitions.create('opacity')
        }
      }}
    />
  );
}

CarouselThumbnail.propTypes = {
  carousels: PropTypes.array.isRequired,
  className: PropTypes.string
};

function CarouselThumbnail({ carousels, className, ...other }) {
  const classes = useStyles();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const settings1 = {
    speed: 500,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next)
  };

  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: carousels.length > 3 ? 3 : carousels.length
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const handlePrevious = () => {
    slider2.current.slickPrev();
  };

  const handleNext = () => {
    slider2.current.slickNext();
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Box
        sx={{
          zIndex: 0,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Slider {...settings1} asNavFor={nav2} ref={slider1}>
          {carousels.map((item) => (
            <LargeItem key={item} item={item} />
          ))}
        </Slider>
        <CarouselArrowsIndex
          index={currentIndex}
          total={carousels.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </Box>

      <Box
        sx={{
          mt: 3,
          mx: 'auto',
          maxWidth:
            (carousels.length === 1 && THUMB_SIZE * 1 + 16) ||
            (carousels.length === 2 && THUMB_SIZE * 2 + 32) ||
            (carousels.length === 3 && THUMB_SIZE * 3 + 48) ||
            (carousels.length === 4 && THUMB_SIZE * 3 + 48) ||
            (carousels.length >= 5 && THUMB_SIZE * 6),
          '& .slick-current img': {
            opacity: 1,
            border: (theme) => `solid 3px ${theme.palette.primary.main}`
          }
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {carousels.map((item) => (
            <ThumbnailItem key={item} item={item} />
          ))}
        </Slider>
      </Box>
    </div>
  );
}

export default CarouselThumbnail;
