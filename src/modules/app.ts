/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Point = [number, number];

const size = 20;

const initialState = {
  size,
  maze: [...Array(size)].map(() => [...Array(size)].map(() => false)),
  nextDigStartPoints: [] as Point[],
  start: false,
  finish: false,
};

const app = createSlice({
  name: 'maze_maker',
  initialState,
  reducers: {
    initializeMaze: (state) => {
      state.maze = [...Array(size)].map(() =>
        [...Array(size)].map(() => false),
      );
      state.nextDigStartPoints = [];
      state.start = false;
      state.finish = false;
    },
    setMazeSize: (state, { payload }: PayloadAction<number>) => {
      state.size = payload;
    },
    digPoint: (state, { payload }: PayloadAction<Point>) => {
      const [x, y] = payload;
      state.maze[y][x] = true;
    },
  },
});

export { app };
