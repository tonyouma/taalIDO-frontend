import ControlStyle from './styles';
import { mapConfig } from 'src/config';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import React, { Suspense, lazy } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { HeaderDashboard } from 'src/layouts/Common';
import {
  DarkTheme,
  RetroTheme,
  NightTheme,
  SilverTheme,
  FlatPaleTheme,
  StandardTheme,
  AubergineTheme
} from './themes';
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

const MAP_THEMES = {
  standard: StandardTheme,
  dark: DarkTheme,
  night: NightTheme,
  retro: RetroTheme,
  silver: SilverTheme,
  flatpale: FlatPaleTheme,
  aubergine: AubergineTheme
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
    borderRadius: theme.shape.borderRadius
  }
}));

// ----------------------------------------------------------------------

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

const baseSettings = {
  id: 'script-loader',
  googleMapsApiKey: mapConfig.apiGoogle,
  loadingElement: SkeletonLoad,
  language: 'en',
  region: 'EN',
  version: 'weekly',
  libraries: ['drawing', 'visualization', 'places']
};

const GoogleMapCircle = lazy(() => import('./GoogleMapCircle'));
const GoogleMapMarker = lazy(() => import('./GoogleMapMarker'));
const GoogleMapPolygon = lazy(() => import('./GoogleMapPolygon'));
const GoogleMapPolyline = lazy(() => import('./GoogleMapPolyline'));
const GoogleMapRectangle = lazy(() => import('./GoogleMapRectangle'));
const GoogleMapStreetView = lazy(() => import('./GoogleMapStreetView'));
const GoogleMapChangeTheme = lazy(() => import('./GoogleMapChangeTheme'));
const GoogleMapAutocomplete = lazy(() => import('./GoogleMapAutocomplete'));
const GoogleMapHeatmapLayer = lazy(() => import('./GoogleMapHeatmapLayer'));
const GoogleMapTrafficLayer = lazy(() => import('./GoogleMapTrafficLayer'));
const GoogleMapTransitLayer = lazy(() => import('./GoogleMapTransitLayer'));
const GoogleMapGroundOverlay = lazy(() => import('./GoogleMapGroundOverlay'));
const GoogleMapDrawingManager = lazy(() => import('./GoogleMapDrawingManager'));
const GoogleMapBicyclingLayer = lazy(() => import('./GoogleMapBicyclingLayer'));
const GoogleMapStreetViewPanorama = lazy(() =>
  import('./GoogleMapStreetViewPanorama')
);

function GoogleMaps() {
  const classes = useStyles();

  return (
    <Page title="Google Map-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Google Map"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Map', href: PATH_APP.components.map.root },
            { name: 'Google Map' }
          ]}
          moreLink="https://react-google-maps-api-docs.netlify.app"
        />

        <Suspense fallback={SkeletonLoad}>
          <ControlStyle />
          <LoadScript {...baseSettings}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map Circle" />
                  <CardContent dir="ltr">
                    <GoogleMapCircle
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map Polygon" />
                  <CardContent dir="ltr">
                    <GoogleMapPolygon
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map Polyline" />
                  <CardContent dir="ltr">
                    <GoogleMapPolyline
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map Rectangle" />
                  <CardContent dir="ltr">
                    <GoogleMapRectangle
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map Marker" />
                  <CardContent dir="ltr">
                    <GoogleMapMarker
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map HeatmapLayer" />
                  <CardContent dir="ltr">
                    <GoogleMapHeatmapLayer
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map DrawingManager" />
                  <CardContent dir="ltr">
                    <GoogleMapDrawingManager
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map BicyclingLayer" />
                  <CardContent dir="ltr">
                    <GoogleMapBicyclingLayer
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map TrafficLayer" />
                  <CardContent dir="ltr">
                    <GoogleMapTrafficLayer
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map TransitLayer" />
                  <CardContent dir="ltr">
                    <GoogleMapTransitLayer
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map Ground Overlay" />
                  <CardContent dir="ltr">
                    <GoogleMapGroundOverlay
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map Autocomplete" />
                  <CardContent dir="ltr">
                    <GoogleMapAutocomplete
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map StreetViewPanorama" />
                  <CardContent dir="ltr">
                    <GoogleMapStreetViewPanorama
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card className={classes.margin}>
                  <CardHeader title="Google Map StreetView" />
                  <CardContent dir="ltr">
                    <GoogleMapStreetView
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Google Map Change Theme" />
                  <CardContent dir="ltr">
                    <GoogleMapChangeTheme
                      themes={MAP_THEMES}
                      className={classes.map}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </LoadScript>
        </Suspense>
      </Container>
    </Page>
  );
}

export default GoogleMaps;
