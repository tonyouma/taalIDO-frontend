import clsx from 'clsx';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { fDate } from 'src/utils/formatTime';
import LazySize from 'src/components/LazySize';
import Lightbox from 'src/components/ModalLightbox';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  IconButton,
  Typography,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  },
  cardContent: {
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    justifyContent: 'space-between',
    color: theme.palette.common.white,
    backgroundColor: alpha(theme.palette.grey[900], 0.72),
    borderBottomLeftRadius: theme.shape.borderRadiusMd,
    borderBottomRightRadius: theme.shape.borderRadiusMd
  }
}));

// ----------------------------------------------------------------------

GalleryCards.propTypes = {
  image: PropTypes.object,
  onOpenLightbox: PropTypes.func,
  className: PropTypes.string
};

function GalleryItem({ image, onOpenLightbox }) {
  const classes = useStyles();
  const { imageUrl, title, postAt } = image;
  return (
    <Card sx={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
      <LazySize
        alt="gallery image"
        src={imageUrl.small}
        size={`${imageUrl.small} 600w, ${imageUrl.medium} 960w`}
        onClick={() => onOpenLightbox(imageUrl.large)}
        sx={{ top: 0, width: '100%', height: '100%', position: 'absolute' }}
      />

      <CardContent className={classes.cardContent}>
        <div>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {fDate(postAt)}
          </Typography>
        </div>
        <IconButton color="inherit">
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

GalleryCards.propTypes = {
  gallery: PropTypes.array.isRequired,
  className: PropTypes.string
};

function GalleryCards({ gallery, className }) {
  const classes = useStyles();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesLightbox = gallery.map((img) => img.imageUrl.large);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => {
      return index === url;
    });
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Gallery
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {gallery.map((image) => (
              <Grid key={image.id} item xs={12} sm={6} lg={4}>
                <GalleryItem
                  image={image}
                  onOpenLightbox={handleOpenLightbox}
                />
              </Grid>
            ))}
          </Grid>

          <Lightbox
            images={imagesLightbox}
            photoIndex={selectedImage}
            setPhotoIndex={setSelectedImage}
            isOpen={openLightbox}
            onClose={() => setOpenLightbox(false)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default GalleryCards;
