import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { startDigging } from '../actions/asyncActions';
import { Point } from '../modules/app';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const useDiggingMaze = () => {
  const dispatch = useDispatch();
  const { maze, nextDigStartPoints } = useShallowEqualSelector(
    ({ maze, nextDigStartPoints }) => ({ maze, nextDigStartPoints }),
  );

  const dig = useCallback(() => {
    const diggingResult = getDiggingResult(maze, nextDigStartPoints);
    dispatch(startDigging(diggingResult));
  }, [maze, nextDigStartPoints]);

  return { dig };
};

export { useDiggingMaze };

const getDiggingResult = (maze: boolean[][], nextDigStartPoints: Point[]) => {
  let diggingPoints = [] as Point[];
  let diggableRoads = [...nextDigStartPoints];
  const startIndex = Math.floor(Math.random() * nextDigStartPoints.length);
  const startPoint = nextDigStartPoints[startIndex];
  const tmpMaze = JSON.parse(JSON.stringify(maze)) as typeof maze;
  let nextPositions = getNextPositions(tmpMaze, startPoint);
  while (nextPositions.length > 0) {
    const positionIndex = Math.floor(Math.random() * nextPositions.length);
    const { pre, next } = nextPositions[positionIndex];
    tmpMaze[pre[1]][pre[0]] = tmpMaze[next[1]][next[0]] = true; // eslint-disable-line no-multi-assign
    diggingPoints = [...diggingPoints, pre, next];
    diggableRoads = [...diggableRoads, next];
    nextPositions = getNextPositions(tmpMaze, next);
  }
  diggableRoads = diggableRoads.filter(
    (roadPoint) => getNextPositions(tmpMaze, roadPoint).length > 0,
  );
  return { diggingPoints, diggableRoads };
};

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const getNextPositions = (maze: boolean[][], [digX, digY]: Point) => {
  return DIRECTIONS.filter(([nextX, nextY]) =>
    canDigNext(maze, [digX + nextX, digY + nextY], [digX, digY]),
  ).map(([nextX, nextY]) => {
    const pre = [digX + nextX, digY + nextY] as Point;
    const next = [digX + 2 * nextX, digY + 2 * nextY] as Point;
    return { pre, next };
  });
};

const canDigNext = (maze: boolean[][], position: Point, exclude: Point) => {
  if (position.some((xy) => xy <= 0 || xy >= maze.length - 1)) {
    return false;
  }
  return [...DIRECTIONS, [0, 0]].every(([nextX, nextY]) => {
    const [x, y] = [position[0] + nextX, position[1] + nextY];
    return (x === exclude[0] && y === exclude[1]) || !maze[y][x];
  });
};
