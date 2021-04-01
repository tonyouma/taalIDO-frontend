import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, Typography, AccordionSummary } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function Controlled({ accordions }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {accordions.map((item) => (
        <Accordion key={item.value}>
          <AccordionSummary>
            <Typography
              variant="subtitle1"
              sx={{ width: '33%', flexShrink: 0 }}
            >
              {item.heading}
            </Typography>
          </AccordionSummary>
        </Accordion>
      ))}
    </div>
  );
}

export default Controlled;
