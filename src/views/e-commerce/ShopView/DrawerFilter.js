import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import Scrollbars from 'src/components/Scrollbars';
import roundClearAll from '@iconify-icons/ic/round-clear-all';
import { PickerManyColor } from 'src/components/ColorUtility';
import roundFilterList from '@iconify-icons/ic/round-filter-list';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Radio,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  drawerPaper: {
    width: 280,
    border: 'none',
    overflow: 'hidden'
  },
  ratingRoot: {
    marginTop: 4,
    marginBottom: 4,
    borderRadius: theme.shape.borderRadius,
    '& > :first-child': {
      paddingTop: 4,
      paddingBottom: 4
    },
    '&:hover': {
      opacity: 0.48,
      '& > *': { backgroundColor: 'transparent' }
    }
  },
  ratingChecked: {
    backgroundColor: theme.palette.background.neutral
  },
  colors: {
    maxWidth: 36 * 4
  },
  box: {
    padding: theme.spacing(0, 3),
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

DrawerFilter.propTypes = {
  colorOptions: PropTypes.array,
  ratingOptions: PropTypes.array,
  categoryOptions: PropTypes.array,
  genderOptions: PropTypes.array,
  priceOptions: PropTypes.array,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object,
  className: PropTypes.string
};

function DrawerFilter({
  colorOptions,
  ratingOptions,
  categoryOptions,
  genderOptions,
  priceOptions,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  isOpenFilter,
  formik,
  className,
  ...other
}) {
  const classes = useStyles();
  const { values, getFieldProps, handleChange } = formik;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            classes={{ paper: classes.drawerPaper }}
          >
            <Box sx={{ px: 1, py: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={onCloseFilter}>
                <Icon icon={arrowIosForwardFill} width={16} height={16} />
              </IconButton>
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
              </Typography>
            </Box>

            <Divider />

            <Scrollbars>
              <Box sx={{ mt: 3 }}>
                <div className={classes.box}>
                  <Typography variant="subtitle1" gutterBottom>
                    Gender
                  </Typography>
                  <FormGroup>
                    {genderOptions.map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            {...getFieldProps('gender')}
                            value={item}
                            checked={values.gender.includes(item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>

                <div className={classes.box}>
                  <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>
                  <RadioGroup {...getFieldProps('category')}>
                    {categoryOptions.map((item) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </div>

                <div className={classes.box}>
                  <Typography variant="subtitle1" gutterBottom>
                    Colour
                  </Typography>
                  <PickerManyColor
                    name="colors"
                    colors={colorOptions}
                    onChange={handleChange}
                    onChecked={(color) => values.colors.includes(color)}
                    className={classes.colors}
                  />
                </div>

                <div className={classes.box}>
                  <Typography variant="subtitle1" gutterBottom>
                    Price
                  </Typography>
                  <RadioGroup {...getFieldProps('priceRange')}>
                    {priceOptions.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </div>

                <div className={classes.box}>
                  <Typography variant="subtitle1" gutterBottom>
                    Rating
                  </Typography>
                  <RadioGroup {...getFieldProps('rating')}>
                    {ratingOptions.map((item, index) => (
                      <FormControlLabel
                        className={clsx(classes.ratingRoot, {
                          [classes.ratingChecked]: values.rating.includes(item)
                        })}
                        key={item}
                        value={item}
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            icon={<Rating readOnly value={4 - index} />}
                            checkedIcon={<Rating readOnly value={4 - index} />}
                          />
                        }
                        label="& Up"
                      />
                    ))}
                  </RadioGroup>
                </div>
              </Box>
            </Scrollbars>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default DrawerFilter;
