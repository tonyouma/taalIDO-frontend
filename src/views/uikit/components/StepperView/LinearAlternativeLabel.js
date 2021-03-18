import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Step,
  Paper,
  Button,
  Stepper,
  StepLabel,
  Typography
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function getSteps() {
  return [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad'
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

function LinearAlternativeLabel() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <>
            <Paper
              sx={{
                p: 3,
                my: 3,
                minHeight: 120,
                bgcolor: 'grey.50024'
              }}
            >
              <Typography sx={{ my: 1 }}>All steps completed</Typography>
            </Paper>
            <Button onClick={handleReset}>Reset</Button>
          </>
        ) : (
          <>
            <Paper
              sx={{
                p: 3,
                my: 3,
                minHeight: 120,
                bgcolor: 'grey.50024'
              }}
            >
              <Typography sx={{ my: 1 }}>
                {getStepContent(activeStep)}
              </Typography>
            </Paper>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
export default LinearAlternativeLabel;
