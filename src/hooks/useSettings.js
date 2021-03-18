import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchMode, switchDirection } from 'src/redux/slices/settings';

// ----------------------------------------------------------------------

function useSettings() {
  const dispatch = useDispatch();
  const { themeMode, themeDirection } = useSelector((state) => state.settings);
  const isLight = themeMode === 'light';

  const handleToggleTheme = useCallback(
    () => dispatch(switchMode(isLight ? 'dark' : 'light')),
    [dispatch, isLight]
  );

  const handleChangeTheme = useCallback(
    (event) => dispatch(switchMode(event.target.value)),
    [dispatch]
  );

  const handleChangeDirection = useCallback(
    (event) => dispatch(switchDirection(event.target.value)),
    [dispatch]
  );

  return {
    // Mode
    themeMode: themeMode,
    toggleMode: handleToggleTheme,
    selectMode: handleChangeTheme,
    // Direction
    themeDirection: themeDirection,
    selectDirection: handleChangeDirection
  };
}

export default useSettings;
