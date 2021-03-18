import Page from 'src/components/Page';
import React, { useState } from 'react';
import { PATH_APP } from 'src/routes/paths';
import { HeaderDashboard } from 'src/layouts/Common';
import { QuillEditor, DraftEditor } from 'src/components/Editor';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function EditorView() {
  const classes = useStyles();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  return (
    <Page title="Editor-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Editor"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Editor' }
          ]}
          moreLink={[
            'https://github.com/zenoamaro/react-quill',
            'https://jpuri.github.io/react-draft-wysiwyg'
          ]}
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Quill Simple Editor" />
          <CardContent>
            <QuillEditor
              simple
              id="simple-editor"
              value={text1}
              onChange={(value) => setText1(value)}
            />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Quill Simple Editor" />
          <CardContent>
            <QuillEditor
              id="full-editor"
              value={text2}
              onChange={(value) => setText2(value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Draft Editor" />
          <CardContent>
            <DraftEditor />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default EditorView;
