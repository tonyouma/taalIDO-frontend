import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function Controlled({ accordions }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {accordions.map((item, index) => (
        <Accordion
          key={item.value}
          disabled={index === 3}
          expanded={expanded === item.value}
          onChange={handleChange(item.value)}
        >
          <AccordionSummary
            expandIcon={
              <Icon icon={arrowIosDownwardFill} width={20} height={20} />
            }
          >
            <Typography
              variant="subtitle1"
              sx={{ width: '33%', flexShrink: 0 }}
            >
              {item.heading}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {item.subHeading}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default Controlled;
