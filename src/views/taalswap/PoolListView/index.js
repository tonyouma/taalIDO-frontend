import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPoolList } from '../../../redux/slices/pool';

function PoolListView() {
  const dispatch = useDispatch();
  const { poolList } = useSelector((state) => state.pool);

  useEffect(() => {
    dispatch(getPoolList());
  }, [dispatch]);

  console.log(poolList);

  return <div />;
}

export default PoolListView;
