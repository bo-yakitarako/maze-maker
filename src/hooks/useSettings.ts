import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { app } from '../modules/app';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const digIntervals = [500, 250, 100, 70, 50, 30, 20, 10];

const useSettings = () => {
  const dispatch = useDispatch();
  const [size, step, digIntervalIndex] = useShallowEqualSelector(
    ({ size, step, digIntervalIndex }) => [size, step, digIntervalIndex],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDigInterval = useCallback((e: any, value: number | number[]) => {
    dispatch(app.actions.setDigInterval(value as number));
  }, []);

  const mainButtonText = useMemo(() => {
    if (step === 'init') {
      return 'はじめる';
    }
    if (step === 'reset') {
      return 'リセット';
    }
    return '押さないで';
  }, [step]);

  const handleMainButton = useCallback(() => {
    switch (step) {
      case 'init':
        dispatch(app.actions.begin());
        break;
      case 'reset':
        dispatch(app.actions.initializeMaze());
        break;
      default:
        break;
    }
  }, [step]);

  const handleSizeSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const size = parseInt(event.target.value, 10);
      dispatch(app.actions.setMazeSize(size));
      if (step === 'init') {
        dispatch(app.actions.initializeMaze());
      }
    },
    [step],
  );

  return {
    size,
    mainButtonText,
    handleMainButton,
    digIntervalIndex,
    handleDigInterval,
    handleSizeSelect,
  };
};

export { digIntervals, useSettings };
