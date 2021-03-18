import clsx from 'clsx';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import LazySize from 'src/components/LazySize';
import {
  CarouselArrowsBasic2,
  CarouselCustomPaging2
} from 'src/components/Carousel';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '& .slick-list': {
      boxShadow: theme.shadows[25].z16,
      borderRadius: theme.shape.borderRadiusMd
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
    <LazySize
      alt={title}
      src={image.small}
      size={`${image.small} 600w, ${image.medium} 960w`}
      sx={{
        width: '100%',
        height: 480
      }}
    />
  );
}

CarouselBasic3.propTypes = {
  carousels: PropTypes.array.isRequired,
  className: PropTypes.string
};

function CarouselBasic3({ carousels, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    speed: 500,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselCustomPaging2({
      sx: { mt: 3 }
    })
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

export default CarouselBasic3;
