import React from 'react';
import faker from 'faker';
import CarouselBasic1 from './CarouselBasic1';
import CarouselBasic2 from './CarouselBasic2';
import CarouselBasic3 from './CarouselBasic3';
import CarouselBasic4 from './CarouselBasic4';
import CarouselThumbnail from './CarouselThumbnail';
import CarouselCenterMode from './CarouselCenterMode';
import CarouselAnimation from './CarouselAnimation';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import { getImgFeed } from 'src/utils/getImages';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const CAROUSELS = [...Array(5)].map((item, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: {
      thumb: getImgFeed(128, setIndex),
      small: getImgFeed(600, setIndex),
      medium: getImgFeed(960, setIndex),
      large: getImgFeed(1440, setIndex)
    }
  };
});

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

function CarouselView() {
  const classes = useStyles();

  return (
    <Page title="Carousel-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Carousel"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Carousel' }
          ]}
          moreLink="https://react-slick.neostack.com"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className={classes.margin}>
              <CardHeader title="Carousel Basic 1" />
              <CardContent>
                <CarouselBasic1 carousels={CAROUSELS} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.margin}>
              <CardHeader title="Carousel Basic 2" />
              <CardContent>
                <CarouselBasic2 carousels={CAROUSELS} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.margin}>
              <CardHeader title="Carousel Basic 3" />
              <CardContent>
                <CarouselBasic3 carousels={CAROUSELS} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className={classes.margin}>
              <CardHeader title="Carousel Basic 4" />
              <CardContent>
                <CarouselBasic4 carousels={CAROUSELS} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className={classes.margin}>
              <CardHeader title="Carousel Thumbnail" />
              <CardContent>
                <CarouselThumbnail carousels={CAROUSELS} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className={classes.margin}>
              <CardHeader title="Carousel Center Mode" />
              <CardContent>
                <CarouselCenterMode carousels={CAROUSELS} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Carousel Animation" />
              <CardContent>
                <CarouselAnimation carousels={CAROUSELS} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default CarouselView;
