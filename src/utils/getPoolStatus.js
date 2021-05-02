import { PoolStatus } from './poolStatus';

export const getPoolStatus = async (swapContract, status, minFundRaise) => {
  let poolStatus;

  if (status === 'Approved') {
    return PoolStatus.APPROVED;
  }

  if (status === 'Candidate') {
    return PoolStatus.CANDIDATE;
  }

  if (status === 'Deployed') {
    return PoolStatus.DEPLOYED;
  }

  if (swapContract.params.contractAddress !== '') {
    // Pool의 현재 상태 확인
    const isPreStart = await swapContract.isPreStart().catch(() => {});
    const isFunded = await swapContract.isFunded().catch(() => {});
    const isOpen = await swapContract.isOpen().catch(() => {});
    const paused = await swapContract.paused().catch(() => {});
    // const minimumRaiseAchieved = await swapContract
    //   .minimumRaiseAchieved()
    //   .catch(() => {});
    // const hasStarted = await swapContract.hasStarted().catch((error) => {
    //   console.log(error);
    // });
    // const hasFinalized = await swapContract.hasFinalized().catch((error) => {
    //   console.log(error);
    // });
    const hasMinimumRaise = await swapContract
      .hasMinimumRaise()
      .catch((error) => {
        console.log(error);
      });

    const tokensAllocated = await swapContract
      .tokensAllocated()
      .catch((error) => console.log(error));

    // console.log('isOpen :', isPreStart);
    // console.log('isOpen :', isOpen);
    // console.log('hasStarted :', hasStarted);
    // console.log('hasFinalized :', hasFinalized);
    // console.log('hasMinimumRaise :', hasMinimumRaise);
    // console.log('minimumRaiseAchieved :', minimumRaiseAchieved);

    if (paused) {
      return PoolStatus.PAUSED;
    }

    if (isOpen) {
      poolStatus = PoolStatus.LIVE;
    } else {
      if (isPreStart) {
        if (isFunded) {
          poolStatus = PoolStatus.UPCOMING;
        }
      } else {
        if (hasMinimumRaise) {
          if (parseInt(minFundRaise) === 0) {
            poolStatus = PoolStatus.FILLED.SUCCESS.CLOSED;
          } else {
            // console.log(parseFloat(tokensAllocated), parseFloat(minFundRaise));
            // console.log(
            //   parseFloat(tokensAllocated) >= parseFloat(minFundRaise)
            // );
            if (parseFloat(tokensAllocated) >= parseFloat(minFundRaise)) {
              // if (minimumRaiseAchieved) {
              // 구매자
              // getMyPurchases(지갑주소)
              // -> return uint256[]
              //    forEach :
              //      redeemTokens(uint256 purchase_id)
              // 판매자
              // withdrawFunds()
              poolStatus = PoolStatus.FILLED.SUCCESS.ACCOMPLISHED;
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
  }
  // console.log('Pool Status :', poolStatus);

  return poolStatus;
};
