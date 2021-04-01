import React from 'react';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  heading: {}
}));

// ----------------------------------------------------------------------

function Simple({ accordions }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {accordions.map((accordion, index) => (
        <Accordion key={accordion.value} disabled={index === 3}>
          <AccordionSummary
            expandIcon={
              <Icon icon={arrowIosDownwardFill} width={20} height={20} />
            }
          >
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default Simple;
