import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import LazySize from 'src/components/LazySize';
import { getImgCover } from 'src/utils/getImages';
import Scrollbars from 'src/components/Scrollbars';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((item, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: getImgCover(128, setIndex),
    postedAt: faker.date.soon()
  };
});

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': {
      marginTop: theme.spacing(3)
    }
  }
}));

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const classes = useStyles();
  const { image, title, description, postedAt } = news;

  return (
    <div className={classes.listItem}>
      <LazySize
        alt={title}
        src={image}
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5
        }}
      />
      <Box sx={{ minWidth: 240, mx: 2 }}>
        <Link component={RouterLink} to="#" color="inherit">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{ flexShrink: 0, color: 'text.secondary' }}
      >
        {formatDistance(postedAt, new Date())}
      </Typography>
    </div>
  );
}

NewsUpdate.propTypes = {
  className: PropTypes.string
};

function NewsUpdate({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="News Update" />

      <Scrollbars>
        <CardContent>
          {NEWS.map((news) => (
            <NewsItem key={news.title} news={news} />
          ))}
        </CardContent>
      </Scrollbars>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

export default NewsUpdate;
