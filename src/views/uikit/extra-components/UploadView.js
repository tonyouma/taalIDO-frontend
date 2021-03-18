import React, { useState } from 'react';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import {
  UploadAvatar,
  UploadMultiFile,
  UploadSingleFile
} from 'src/components/Upload';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function UploadView() {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState('');

  return (
    <Page title="Upload-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Upload"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Upload' }
          ]}
          moreLink="https://react-dropzone.js.org/#section-basic-example"
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Upload MultiFile" />
          <CardContent>
            <UploadMultiFile value={files} onChange={setFiles} />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Upload Single File" />
          <CardContent>
            <UploadSingleFile value={file} onChange={setFile} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upload Avatar" />
          <CardContent>
            <UploadAvatar value={photoURL} onChange={setPhotoURL} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default UploadView;
