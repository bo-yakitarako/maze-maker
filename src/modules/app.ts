/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { displayStartPoints, startDigging } from '../actions/asyncActions';

type Point = [number, number];
type Step = 'start' | 'dig' | 'selectNextStartPoint' | 'finish';

const size = 21;
const maze = [...Array(size)].map(() => [...Array(size)].map(() => false));
maze[size - 2][1] = true;

const initialState = {
  size,
  maze,
  nextDigStartPoints: [[1, size - 2]] as Point[],
  step: 'start' as Step,
};

const app = createSlice({
  name: 'maze_maker',
  initialState,
  reducers: {
    initializeMaze: (state) => {
      state.maze = [...Array(state.size)].map(() =>
        [...Array(state.size)].map(() => false),
      );
      const startPoint = [1, state.maze.length - 2] as Point;
      state.nextDigStartPoints = [startPoint];
      state.maze[startPoint[1]][startPoint[0]] = true;
      state.step = 'start';
    },
    setMazeSize: (state, { payload }: PayloadAction<number>) => {
      state.size = payload;
    },
    digPoint: (state, { payload }: PayloadAction<Point>) => {
      const [x, y] = payload;
      state.maze[y][x] = true;
    },
    setStartPoints: (state, { payload }: PayloadAction<Point[]>) => {
      state.nextDigStartPoints = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startDigging.fulfilled, (state, { payload }) => {
      state.nextDigStartPoints = payload;
      state.step = payload.length > 0 ? 'selectNextStartPoint' : 'finish';
    });
    builder.addCase(displayStartPoints.fulfilled, (state) => {
      state.step = 'dig';
    });
  },
});

export { app, Point };
