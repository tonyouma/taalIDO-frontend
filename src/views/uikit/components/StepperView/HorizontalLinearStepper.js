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
import { MButton } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
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
              <Typography sx={{ my: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </Paper>

            <Button color="inherit" onClick={handleReset}>
              Reset
            </Button>
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
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <MButton
                  color="error"
                  variant="contained"
                  onClick={handleSkip}
                  sx={{ ml: 1 }}
                >
                  Skip
                </MButton>
              )}

              <Button variant="contained" onClick={handleNext} sx={{ ml: 1 }}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </div>
    </div>
  );
}

export default HorizontalLinearStepper;
