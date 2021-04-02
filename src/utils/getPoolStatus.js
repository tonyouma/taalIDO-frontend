import { PoolStatus } from './poolStatus';

export const getPoolStatus = async (swapContract) => {
  // Pool의 현재 상태 확인
  const isPreStart = await swapContract.isPreStart().catch(() => {});
  const isFunded = await swapContract.isFunded().catch(() => {});
  const isOpen = await swapContract.isOpen().catch(() => {});
  const hasStarted = await swapContract.hasStarted().catch(() => {});
  const hasFinalized = await swapContract.hasFinalized().catch(() => {});
  const hasMinimumRaise = await swapContract.hasMinimumRaise().catch(() => {});
  const minimumRaiseAchieved = await swapContract
    .minimumRaiseAchieved()
    .catch(() => {});
  // console.log('isOpen :', isPreStart);
  // console.log('isOpen :', isOpen);
  // console.log('hasStarted :', hasStarted);
  // console.log('hasFinalized :', hasFinalized);
  // console.log('hasMinimumRaise :', hasMinimumRaise);
  // console.log('minimumRaiseAchieved :', minimumRaiseAchieved);

  let poolStatus;
  if (isOpen) {
    poolStatus = PoolStatus.LIVE;
  } else {
    if (isPreStart) {
      if (isFunded) {
        poolStatus = PoolStatus.UPCOMING;
      }
    } else {
      if (hasMinimumRaise) {
        if (minimumRaiseAchieved) {
          // 구매자
          // getMyPurchases(지갑주소)
          // -> return uint256[]
          //    forEach :
          //      redeemTokens(uint256 purchase_id)
          // 판매자
          // withdrawFunds()
          poolStatus = PoolStatus.FILLED.SUCCESS.ACHIEVED;
        } else {
          // 구매자
          // getMyPurchases(지갑주소)
          // -> return uint256[]
          //    forEach :
          //      redeemGivenMinimumGoalNotAchieved(uint256 purchase_id)
          // 판매자
          // withdrawUnsoldTokens()
          poolStatus = PoolStatus.FILLED.FAILED;
        }
      } else {
        poolStatus = PoolStatus.FILLED.SUCCESS.CLOSED;
        // 구매자
        // getMyPurchases(지갑주소)
        // -> return uint256[]
        //    forEach :
        //      redeemTokens(uint256 purchase_id)
        // 판매자
        // withdrawFunds()
        // withdrawUnsoldTokens()
      }
    }
  }
  // console.log('Pool Status :', poolStatus);

  return poolStatus;
};
