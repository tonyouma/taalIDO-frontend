import clsx from 'clsx';
import faker from 'faker';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';
import { getImgFeed } from 'src/utils/getImages';
import { Link as RouterLink } from 'react-router-dom';
import {
  CarouselArrowsBasic1,
  CarouselCustomPaging1
} from 'src/components/Carousel';
import {
  varFadeInLeft,
  varFadeInRight,
  MotionContainer
} from 'src/components/Animate';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { CardContent, Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const CAROUSELS = [
  'Harry Potter and the Deathly Hallows - Part 2',
  'Disney Zombies 2',
  'Lightroom mobile - Koloro'
].map((item, index) => {
  const setIndex = index + 3;

  return {
    title: item,
    description: faker.lorem.lines(),
    image: {
      small: getImgFeed(600, setIndex),
      medium: getImgFeed(960, setIndex)
    }
  };
});

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
  const { image, title, description } = item;
  const isRTL = theme.direction === 'rtl';
  const setAnimate = isRTL ? varFadeInLeft : varFadeInRight;

  return (
    <RouterLink to="#">
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            top: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
          }}
        />
        <Box
          component="img"
          alt={title}
          src="/static/images/placeholder.svg"
          srcSet={`${image.small} 600w, ${image.medium} 960w`}
          sx={{
            width: '100%',
            objectFit: 'cover',
            height: { xs: 280, xl: 320 }
          }}
        />
        <CardContent
          sx={{
            bottom: 0,
            width: '100%',
            textAlign: 'left',
            position: 'absolute',
            color: 'common.white'
          }}
        >
          <MotionContainer open={isActive}>
            <motion.div variants={setAnimate}>
              <Typography
                variant="overline"
                sx={{
                  mb: 1,
                  opacity: 0.48,
                  display: 'block'
                }}
              >
                Featured App
              </Typography>
            </motion.div>
            <motion.div variants={setAnimate}>
              <Typography variant="h5" gutterBottom noWrap>
                {title}
              </Typography>
            </motion.div>
            <motion.div variants={setAnimate}>
              <Typography variant="body2" noWrap>
                {description}
              </Typography>
            </motion.div>
          </MotionContainer>
        </CardContent>
      </Box>
    </RouterLink>
  );
}

FeaturedApp.propTypes = {
  className: PropTypes.string
};

function FeaturedApp({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? CAROUSELS.length - 1 : 0
  );

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselCustomPaging1({
      color: 'primary.main',
      sx: {
        top: theme.spacing(3),
        left: theme.spacing(3),
        bottom: 'auto !important',
        right: 'auto !important'
      }
    })
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
        {CAROUSELS.map((item, index) => (
          <CarouselItem
            key={item.title}
            item={item}
            isActive={index === currentIndex}
          />
        ))}
      </Slider>

      <CarouselArrowsBasic1 onNext={handleNext} onPrevious={handlePrevious} />
    </Card>
  );
}

export default FeaturedApp;
