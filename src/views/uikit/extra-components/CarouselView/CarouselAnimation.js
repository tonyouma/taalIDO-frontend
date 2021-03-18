import clsx from 'clsx';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import LazySize from 'src/components/LazySize';
import React, { useState, useRef } from 'react';
import { CarouselArrowsIndex } from 'src/components/Carousel';
import {
  varFadeInLeft,
  varFadeInRight,
  MotionContainer
} from 'src/components/Animate';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Paper,
  Button,
  Typography,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool
};

function CarouselItem({ item, isActive }) {
  const theme = useTheme();
  const { image, title } = item;
  const setAnimate = theme.direction === 'rtl' ? varFadeInLeft : varFadeInRight;

  return (
    <Paper
      sx={{
        position: 'relative',
        paddingTop: { xs: '100%', md: '50%' }
      }}
    >
      <LazySize
        alt={title}
        src={image.small}
        size={`${image.small} 600w, ${image.medium} 960w, ${image.large} 1280w`}
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
      />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: `linear-gradient(to top, ${
            theme.palette.grey[900]
          } 0%,${alpha(theme.palette.grey[900], 0)} 100%)`
        }}
      />
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: 480,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        <MotionContainer open={isActive}>
          <motion.div variants={setAnimate}>
            <Typography variant="h3" gutterBottom>
              {item.title}
            </Typography>
          </motion.div>
          <motion.div variants={setAnimate}>
            <Typography variant="body2" noWrap gutterBottom>
              {item.description}
            </Typography>
          </motion.div>
          <motion.div variants={setAnimate}>
            <Button variant="contained" sx={{ mt: 3 }}>
              View More
            </Button>
          </motion.div>
        </MotionContainer>
      </CardContent>
    </Paper>
  );
}

CarouselAnimation.propTypes = {
  carousels: PropTypes.array.isRequired,
  className: PropTypes.string
};

function CarouselAnimation({ carousels, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? carousels.length - 1 : 0
  );

  const settings = {
    speed: 800,
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
        {carousels.map((item, index) => (
          <CarouselItem
            key={item.title}
            item={item}
            isActive={index === currentIndex}
          />
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

export default CarouselAnimation;
