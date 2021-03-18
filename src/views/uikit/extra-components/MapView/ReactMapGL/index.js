import { mapConfig } from 'src/config';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import React, { Suspense, lazy } from 'react';
import { cities as CITIES } from './data/cities';
import { stations as STATIONS } from './data/stations';
import { countries as COUNTRIES } from './data/countries';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Skeleton,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11'
};

const baseSettings = {
  mapboxApiAccessToken: mapConfig.apiMapBox,
  width: '100%',
  height: '100%',
  minZoom: 1
};

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  },
  map: {
    zIndex: 0,
    height: 560,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
      display: 'none'
    }
  }
}));

// ----------------------------------------------------------------------

const GLHeatmap = lazy(() => import('./GLHeatmap'));
const GLGeojson = lazy(() => import('./GLGeojson'));
const GLMapClusters = lazy(() => import('./GLMapClusters'));
const GLChangeTheme = lazy(() => import('./GLChangeTheme'));
const GLZoomToBounds = lazy(() => import('./GLZoomToBounds'));
const GLMarkersPopups = lazy(() => import('./GLMarkersPopups'));
const GLDeckglOverlay = lazy(() => import('./GLDeckglOverlay'));
const GLDynamicStyling = lazy(() => import('./GLDynamicStyling'));
const GLMapInteraction = lazy(() => import('./GLMapInteraction'));
const GLDraggableMarkers = lazy(() => import('./GLDraggableMarkers'));
const GLGeoJSONAnimation = lazy(() => import('./GLGeoJSONAnimation'));
const GLHighlightByFilter = lazy(() => import('./GLHighlightByFilter'));
const GLMapViewportAnimation = lazy(() => import('./GLMapViewportAnimation'));

const SkeletonLoad = (
  <>
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2, mb: 5 }}
    />
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2 }}
    />
  </>
);

function ReactMapGL() {
  const classes = useStyles();

  return (
    <Page title="Mapbox-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Mapbox"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Map', href: PATH_APP.components.map.root },
            { name: 'Mapbox' }
          ]}
          moreLink={[
            'http://visgl.github.io/react-map-gl',
            'https://docs.mapbox.com/mapbox-gl-js/example'
          ]}
        />

        <Suspense fallback={SkeletonLoad}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Change Theme" />
                <CardContent>
                  <GLChangeTheme
                    {...baseSettings}
                    themes={THEMES}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Dynamic Styling" />
                <CardContent>
                  <GLDynamicStyling {...baseSettings} className={classes.map} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Markers & Popups" />
                <CardContent>
                  <GLMarkersPopups
                    {...baseSettings}
                    data={COUNTRIES}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Draggable Markers" />
                <CardContent>
                  <GLDraggableMarkers
                    {...baseSettings}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Geojson" />
                <CardContent>
                  <GLGeojson
                    {...baseSettings}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Geojson Animation" />
                <CardContent>
                  <GLGeoJSONAnimation
                    {...baseSettings}
                    mapStyle={THEMES.satelliteStreets}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Clusters" />
                <CardContent>
                  <GLMapClusters
                    {...baseSettings}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Interaction" />
                <CardContent>
                  <GLMapInteraction
                    {...baseSettings}
                    data={STATIONS}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Viewport Animation" />
                <CardContent>
                  <GLMapViewportAnimation
                    {...baseSettings}
                    data={CITIES.filter((city) => city.state === 'Texas')}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Highlight By Filter" />
                <CardContent>
                  <GLHighlightByFilter
                    {...baseSettings}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Zoom To Bounds" />
                <CardContent>
                  <GLZoomToBounds {...baseSettings} className={classes.map} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.margin}>
                <CardHeader title="GL Map Deckgl Overlay" />
                <CardContent>
                  <GLDeckglOverlay
                    {...baseSettings}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="GL Map Heatmap" />
                <CardContent>
                  <GLHeatmap
                    {...baseSettings}
                    mapStyle={THEMES.light}
                    className={classes.map}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Suspense>
      </Container>
    </Page>
  );
}

export default ReactMapGL;
