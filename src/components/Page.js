import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import track from 'src/utils/analytics';
import { useLocation } from 'react-router-dom';
import React, { forwardRef, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  const { pathname } = useLocation();

  const sendPageViewEvent = useCallback(() => {
    track.pageview({
      page_path: pathname
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sendPageViewEvent();
  }, [sendPageViewEvent]);

  return (
    <div ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
