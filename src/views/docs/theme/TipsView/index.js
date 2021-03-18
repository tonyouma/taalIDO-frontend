import React from 'react';
import Page from 'src/components/Page';
import ReadMdFile from 'src/components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function TipsView() {
  return (
    <Page title="Tips | Documentation">
      <ReadMdFile content={content} />
    </Page>
  );
}
