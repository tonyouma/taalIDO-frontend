export const PoolStatus = {
  CANDIDATE: 'Candidate', // IDO Application 작성 후 승인 대기 상태
  APPROVED: 'Approved', // IDO 승인 완료 상태
  DEPLOYED: 'Deployed', // FixedSwap 컨트랙이 작성되고, 승인되어 배포된 상태
  UPCOMING: 'Upcoming', // Approve 및 Funded 된 Sale 준비, startDate 전
  SOLDOUT: 'Soldout',
  PAUSED: 'Paused',
  LIVE: 'Live', // Sale 진행 중
  FILLED: {
    // endDate 이후
    SUCCESS: {
      ACCOMPLISHED: 'Accomplished', //
      // ACHIEVED: 'achieved', /
      CLOSED: 'closed'
    },
    FAILED: 'failed'
  }
};
