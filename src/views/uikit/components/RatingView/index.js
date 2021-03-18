import Page from 'src/components/Page';
import React, { useState } from 'react';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { HeaderDashboard } from 'src/layouts/Common';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Grid,
  Rating,
  Container,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
};

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied'
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied'
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral'
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied'
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied'
  }
};

const StyledRating = withStyles({
  iconFilled: { color: '#FF4842' },
  iconHover: { color: '#B72136' }
})(Rating);

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

function RatingView() {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  return (
    <Page title="Rating-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Rating"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Rating' }
          ]}
          moreLink="https://next.material-ui.com/components/rating"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Controlled">
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Read only">
                  <Rating name="read-only" value={value} readOnly />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Disabled">
                  <Rating name="disabled" value={value} disabled />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Pristine">
                  <Rating name="pristine" value={null} />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Custom empty icon">
                  <Rating
                    name="customized-empty"
                    defaultValue={2}
                    precision={0.5}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Custom icon and color">
                  <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? 's' : ''}`
                    }
                    precision={0.5}
                    icon={<FavoriteIcon />}
                    emptyIcon={<FavoriteIcon />}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="10 stars">
                  <Rating name="customized-10" defaultValue={2} max={10} />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Custom icon set">
                  <Rating
                    name="customized-icons"
                    defaultValue={2}
                    getLabelText={(value) => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Hover feedback">
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Half ratings">
                  <Rating
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                  />
                  <br />
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Sizes">
                  <Rating name="size-small" defaultValue={2} size="small" />
                  <br />
                  <Rating name="size-medium" defaultValue={2} />
                  <br />
                  <Rating name="size-large" defaultValue={2} size="large" />
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RatingView;
