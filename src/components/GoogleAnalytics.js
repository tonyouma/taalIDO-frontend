import React from 'react';
import { Helmet } from 'react-helmet';
import { googleAnalyticsConfig } from 'src/config';

// ----------------------------------------------------------------------

const GA_MEASUREMENT_ID = googleAnalyticsConfig;

function GoogleAnalytics() {
  return (
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </script>
    </Helmet>
  );
}

export default GoogleAnalytics;
