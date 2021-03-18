import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'src/components/Markdown';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

Description.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string
};

function Description({ product, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Markdown source={product.description} />
    </div>
  );
}

export default Description;
