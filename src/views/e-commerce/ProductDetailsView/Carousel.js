import clsx from 'clsx';
import Slider from 'react-slick';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import LazySize from 'src/components/LazySize';
import Lightbox from 'src/components/ModalLightbox';
import React, { useState, useRef, useEffect } from 'react';
import { CarouselArrowsIndex } from 'src/components/Carousel';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const useStyles = makeStyles((theme) => {
  const isRTL = theme.direction === 'rtl';

  return {
    root: {
      '& .slick-slide': {
        float: isRTL ? 'right' : 'left',
        '&:focus': { outline: 'none' }
      }
    },
    thumbListStyle: {
      position: 'relative',
      '&:before, &:after': {
        top: 0,
        zIndex: 9,
        content: "''",
        height: '100%',
        position: 'absolute',
        width: (THUMB_SIZE * 2) / 3,
        backgroundImage: `linear-gradient(to left, ${alpha(
          theme.palette.background.paper,
          0
        )} 0%, ${theme.palette.background.paper} 100%)`
      },
      '&:after': {
        right: 0,
        transform: 'scaleX(-1)'
      }
    }
  };
});

// ----------------------------------------------------------------------

LargeItem.propTypes = {
  item: PropTypes.object,
  onOpenLightbox: PropTypes.func
};

function LargeItem({ item, onOpenLightbox }) {
  return (
    <Box sx={{ cursor: 'zoom-in', paddingTop: '100%', position: 'relative' }}>
      <LazySize
        alt="large image"
        src={item.small}
        size={`${item.small} 600w, ${item.medium} 960w`}
        onClick={() => onOpenLightbox(item.large)}
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
  return (
    <Box
      sx={{
        mx: 1,
        borderRadius: 1.5,
        cursor: 'pointer',
        overflow: 'hidden',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        position: 'relative',
        '&:hover': {
          opacity: 0.72,
          transition: (theme) => theme.transitions.create('opacity')
        }
      }}
    >
      <Box
        sx={{
          top: 0,
          zIndex: 9,
          opacity: 0,
          width: '100%',
          height: '100%',
          borderRadius: 1.5,
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
          border: (theme) => `solid 3px ${theme.palette.primary.main}`
        }}
        className="isActive"
      />
      <LazySize
        alt="thumb image"
        src={item.thumb}
        sx={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
}

Carousel.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string
};

function Carousel({ product, className, ...other }) {
  const classes = useStyles();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const imagesLightbox = product.images.map((_image) => _image.large);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => {
      return index === url;
    });
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

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
    slidesToShow: product.images.length > 3 ? 3 : product.images.length
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [currentIndex]);

  const handlePrevious = () => {
    slider2.current.slickPrev();
  };

  const handleNext = () => {
    slider2.current.slickNext();
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {product.images.map((item) => (
              <LargeItem
                key={item}
                item={item}
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
          </Slider>
          <CarouselArrowsIndex
            index={currentIndex}
            total={product.images.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 'auto',
          maxWidth:
            (product.images.length === 1 && THUMB_SIZE * 1 + 16) ||
            (product.images.length === 2 && THUMB_SIZE * 2 + 32) ||
            (product.images.length === 3 && THUMB_SIZE * 3 + 48) ||
            (product.images.length === 4 && THUMB_SIZE * 3 + 48) ||
            (product.images.length >= 5 && THUMB_SIZE * 6),
          '& .slick-current .isActive': { opacity: 1 }
        }}
        className={clsx({
          [classes.thumbListStyle]: product.images.length > 2
        })}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {product.images.map((item) => (
            <ThumbnailItem key={item} item={item} />
          ))}
        </Slider>
      </Box>

      <Lightbox
        images={imagesLightbox}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </div>
  );
}

export default Carousel;
