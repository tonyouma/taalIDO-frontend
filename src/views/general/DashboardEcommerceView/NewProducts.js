import clsx from 'clsx';
import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import LazySize from 'src/components/LazySize';
import { getImgProduct } from 'src/utils/getImages';
import { Link as RouterLink } from 'react-router-dom';
import { CarouselCustomPaging1 } from 'src/components/Carousel';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, Button, CardContent, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const PRODUCTS = [
  'Nike Air Max 97',
  'Nike Zoom Gravity',
  'Nike DBreak-Type',
  'Kyrie Flytrap 3 EP Basketball Shoe',
  'Nike Air Max Fusion Men'
].map((product, index) => {
  const setIndex = index + 1;
  return {
    name: product,
    image: {
      small: getImgProduct(600, setIndex),
      medium: getImgProduct(960, setIndex)
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

function CarouselItem({ item }) {
  const { image, name } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <LazySize
        alt={name}
        src={image.small}
        size={`${image.small} 600w, ${image.medium} 960w`}
        sx={{
          width: '100%',
          height: { xs: 280, xl: 320 }
        }}
      />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
        }}
      />
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: '80%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          New
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, mb: 3, nowrap: true }}>
          {name}
        </Typography>
        <Button to="#" variant="contained" component={RouterLink}>
          Buy Now
        </Button>
      </CardContent>
    </Box>
  );
}

NewProducts.propTypes = {
  className: PropTypes.string
};

function NewProducts({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselCustomPaging1({ color: 'primary.main' })
  };

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Slider {...settings}>
        {PRODUCTS.map((item) => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

export default NewProducts;
