import { useEffect } from 'react';
import { BREAKPOINT } from '../modules/styleUtility';
import { useMediaQuery } from './useMediaQuery';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const useDrawingMaze = (canvas: HTMLCanvasElement) => {
  const maze = useShallowEqualSelector(({ maze }) => maze);

  const { windowWidth } = useMediaQuery();

  useEffect(() => {
    drawMaze(canvas, maze, windowWidth);
  }, [canvas, maze, windowWidth]);
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
  windowWidth: number,
) => {
  if (canvas === null) {
    return;
  }
  const squareWidth = getSquareWidth(maze.length, windowWidth);
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const fillRect = (x: number, y: number) => {
    context.fillRect(
      x * squareWidth,
      y * squareWidth,
      squareWidth,
      squareWidth,
    );
  };
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'white';
  maze.forEach((rowArray, yIndex) => {
    rowArray.forEach((isLoad, xIndex) => {
      if (isLoad) {
        fillRect(xIndex, yIndex);
      }
    });
  });
};
