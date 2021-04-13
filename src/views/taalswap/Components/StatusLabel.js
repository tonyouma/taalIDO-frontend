import React from 'react';
import { MLabel } from 'src/theme';
import { PoolStatus } from 'src/utils/poolStatus';

const StatusLabel = ({ poolStatus, absolute }) => {
  return (
    <>
      {poolStatus === PoolStatus.CANDIDATE ? (
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
      {poolStatus === PoolStatus.APPROVED ? (
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
      {poolStatus === PoolStatus.DEPLOYED ? (
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
      {poolStatus === PoolStatus.UPCOMING ? (
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
      {poolStatus === 'Ready' ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="default"
        >
          Ready
        </MLabel>
      ) : null}
      {poolStatus === PoolStatus.LIVE ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="info"
        >
          Live
        </MLabel>
      ) : null}
      {poolStatus === PoolStatus.FILLED.SUCCESS.ACCOMPLISHED ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="error"
        >
          Accomplished
        </MLabel>
      ) : null}
      {poolStatus === PoolStatus.FILLED.SUCCESS.CLOSED ? (
        <MLabel
          sx={{
            top: 16,
            right: 16,
            position: absolute && 'absolute'
          }}
          color="error"
        >
          Closed
        </MLabel>
      ) : null}
      {poolStatus === PoolStatus.FILLED.FAILED ? (
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
    </>
  );
};

export default StatusLabel;
