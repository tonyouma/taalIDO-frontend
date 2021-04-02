import React from 'react';
import { MLabel } from 'src/theme';

const StatusLabel = ({ poolStatus, absolute }) => {
  return (
    <div>
      {poolStatus === 'Candidate' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="primary"
        >
          Candidate
        </MLabel>
      ) : null}
      {poolStatus === 'Approved' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="info"
        >
          Approved
        </MLabel>
      ) : null}
      {poolStatus === 'Deployed' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="success"
        >
          Deployed
        </MLabel>
      ) : null}
      {poolStatus === 'Upcoming' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="success"
        >
          Upcoming
        </MLabel>
      ) : null}
      {poolStatus === 'Live' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="success"
        >
          Live
        </MLabel>
      ) : null}
      {poolStatus === 'deployed' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="success"
        >
          Deployed
        </MLabel>
      ) : null}
      {poolStatus === 'closed' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="failed"
        >
          Close
        </MLabel>
      ) : null}
      {poolStatus === 'failed' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="warning"
        >
          Failed
        </MLabel>
      ) : null}
    </div>
  );
};

export default StatusLabel;
