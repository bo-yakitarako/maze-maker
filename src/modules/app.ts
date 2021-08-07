/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  displayStartPoints,
  finish,
  startDigging,
  startMazeCreation,
} from '../actions/asyncActions';

type Point = [number, number];
type Step =
  | 'init'
  | 'start'
  | 'dig'
  | 'selectNextStartPoint'
  | 'finish'
  | 'reset';

const size = parseInt(localStorage.mazeSize || '21', 10);
const maze = [...Array(size)].map(() => [...Array(size)].map(() => false));

const initialState = {
  size,
  maze,
  nextDigStartPoints: [] as Point[],
  step: 'init' as Step,
  digIntervalIndex: parseInt(localStorage.digIntervalIndex || '4', 10),
};

const app = createSlice({
  name: 'maze_maker',
  initialState,
  reducers: {
    initializeMaze: (state) => {
      state.maze = [...Array(state.size)].map(() =>
        [...Array(state.size)].map(() => false),
      );
      state.step = 'init';
    },
    begin: (state) => {
      state.step = 'start';
    },
    digStartPoint: (state) => {
      const startPoint = [1, state.maze.length - 2] as Point;
      state.nextDigStartPoints = [startPoint];
      state.maze[startPoint[1]][startPoint[0]] = true;
    },
    startDig: (state) => {
      state.step = 'dig';
    },
    setMazeSize: (state, { payload }: PayloadAction<number>) => {
      state.size = payload;
      localStorage.mazeSize = payload;
    },
    digPoint: (state, { payload }: PayloadAction<Point>) => {
      const [x, y] = payload;
      state.maze[y][x] = true;
    },
    setDigInterval: (state, { payload }: PayloadAction<number>) => {
      state.digIntervalIndex = payload;
      localStorage.digIntervalIndex = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startMazeCreation.fulfilled, (state) => {
      state.step = 'dig';
    });
    builder.addCase(startDigging.fulfilled, (state, { payload }) => {
      state.nextDigStartPoints = payload;
      state.step = payload.length > 0 ? 'selectNextStartPoint' : 'finish';
    });
    builder.addCase(displayStartPoints.fulfilled, (state) => {
      state.step = 'dig';
    });
    builder.addCase(finish.fulfilled, (state) => {
      state.step = 'reset';
    });
  },
});

export { app, Point };
