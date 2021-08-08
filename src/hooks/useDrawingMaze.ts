import { useEffect } from 'react';
import { Point } from '../modules/app';
import { BREAKPOINT } from '../modules/styleUtility';
import { useMediaQuery } from './useMediaQuery';
import { digIntervals } from './useSettings';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const useDrawingMaze = (canvas: HTMLCanvasElement) => {
  const [maze, step, startPoints, digIntervalIndex] = useShallowEqualSelector(
    ({ maze, step, nextDigStartPoints, digIntervalIndex }) => [
      maze,
      step,
      nextDigStartPoints,
      digIntervalIndex,
    ],
  );

  const { windowWidth } = useMediaQuery();

  useEffect(() => {
    const visibleStarts =
      step === 'selectNextStartPoint' &&
      digIntervalIndex < digIntervals.length - 1;
    drawMaze(canvas, maze, visibleStarts, startPoints, windowWidth);
  }, [canvas, maze, step, digIntervalIndex, windowWidth]);
};

export { useDrawingMaze, getCanvasWidth };

const getCanvasWidth = (mazeSize: number, windowWidth: number) =>
  getSquareWidth(mazeSize, windowWidth) * mazeSize;

const getSquareWidth = (mazeSize: number, windowWidth: number) => {
  const rawCanvasSize = getRawCanvasWidth(windowWidth);
  return Math.floor(rawCanvasSize / mazeSize);
};

const getRawCanvasWidth = (windowWidth: number) => {
  if (windowWidth < BREAKPOINT.SMALL) {
    return windowWidth * 0.95;
  }
  if (windowWidth < BREAKPOINT.MEDIUM) {
    return windowWidth * 0.75;
  }
  return 600;
};

const drawMaze = (
  canvas: HTMLCanvasElement,
  maze: boolean[][],
  visibleStarts: boolean,
  startPoints: Point[],
  windowWidth: number,
) => {
  if (canvas === null) {
    return;
  }
  const squareWidth = getSquareWidth(maze.length, windowWidth);
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const hasEdge = maze.length < 40;
  const fillRect = (x: number, y: number) => {
    context.fillRect(
      x * squareWidth + (hasEdge ? 1 : 0),
      y * squareWidth + (hasEdge ? 1 : 0),
      squareWidth - (hasEdge ? 2 : 0),
      squareWidth - (hasEdge ? 2 : 0),
    );
  };
  maze.forEach((rowArray, yIndex) => {
    rowArray.forEach((isLoad, xIndex) => {
      context.fillStyle = isLoad ? 'white' : 'black';
      fillRect(xIndex, yIndex);
    });
  });
  if (visibleStarts) {
    context.fillStyle = 'cyan';
    startPoints.forEach(([x, y]) => fillRect(x, y));
  }
};
