import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { digIntervals } from '../hooks/useSettings';
import { app, Point } from '../modules/app';
import { Store } from '../modules/store';

type Thunk = {
  dispatch: Dispatch;
  state: Store;
};

const startMazeCreation = createAsyncThunk<void, void, Thunk>(
  'startMazeCreation',
  async (v, { dispatch }) => {
    dispatch(app.actions.digStartPoint());
    await sleep(1000);
  },
);

type DiggingResult = {
  diggingPoints: Point[];
  diggableRoads: Point[];
};

const startDigging = createAsyncThunk<Point[], DiggingResult, Thunk>(
  'startDigging',
  async ({ diggingPoints, diggableRoads }, { dispatch, getState }) => {
    const { digIntervalIndex } = getState();
    // eslint-disable-next-line no-restricted-syntax
    for (const point of diggingPoints) {
      dispatch(app.actions.digPoint(point));
      await sleep(digIntervals[digIntervalIndex]); // eslint-disable-line no-await-in-loop
    }
    return diggableRoads;
  },
);

const displayStartPoints = createAsyncThunk<void, void, Thunk>(
  'displayStartPoints',
  async (v, { getState }) => {
    const { digIntervalIndex } = getState();
    await sleep(digIntervalIndex > 4 ? 500 : 900);
  },
);

const finish = createAsyncThunk<void, void, Thunk>(
  'finish',
  async (v, { getState, dispatch }) => {
    const { size } = getState();
    await sleep(500);
    const start = [1, size - 1] as Point;
    dispatch(app.actions.digPoint(start));
    await sleep(500);
    const goal = [size - 2, 0] as Point;
    dispatch(app.actions.digPoint(goal));
  },
);

export { startMazeCreation, startDigging, displayStartPoints, finish };

const sleep = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));
