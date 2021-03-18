import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'src/utils/axios';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { paramCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Link as RouterLink } from 'react-router-dom';
import searchFill from '@iconify-icons/eva/search-fill';
import SearchNotFound from 'src/components/SearchNotFound';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  autocomplete: {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 240,
      '& $input': { boxShadow: theme.shadows[25].z12 }
    }
  },
  input: {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  option: {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`
    }
  },
  noOptions: { display: 'none' }
}));

// ----------------------------------------------------------------------

SearchPost.propTypes = {
  className: PropTypes.string
};

function SearchPost({ className }) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const linkTo = (title) => {
    return PATH_APP.management.blog.root + '/post/' + paramCase(title);
  };

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/api/blog/posts/search', {
          params: { query: value }
        });
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Autocomplete
        size="small"
        disablePortal
        popupIcon={null}
        options={searchResults}
        onInputChange={handleChangeSearch}
        getOptionLabel={(post) => post.title}
        noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
        classes={{
          root: classes.autocomplete,
          option: classes.option,
          inputRoot: classes.input,
          noOptions: !searchQuery && classes.noOptions
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search post..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{
                        ml: 1,
                        width: 20,
                        height: 20,
                        color: 'text.disabled'
                      }}
                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}
        renderOption={(props, post, { inputValue }) => {
          const { title } = post;
          const matches = match(title, inputValue);
          const parts = parse(title, matches);
          return (
            <li {...props}>
              <Link to={linkTo(title)} component={RouterLink} underline="none">
                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    variant="subtitle2"
                    color={part.highlight ? 'primary' : 'textPrimary'}
                  >
                    {part.text}
                  </Typography>
                ))}
              </Link>
            </li>
          );
        }}
      />
    </div>
  );
}

export default SearchPost;
