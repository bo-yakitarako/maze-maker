import { DIRECTIONS, Point } from './generator';

type Road = { reach: Point[]; longest: Point[] };

const findAnswer = (mazeArray: boolean[][]) => {
  const foundRoads = [
    [1, mazeArray.length - 1],
    [1, mazeArray.length - 2],
  ] as Point[];
  return createAnswer(mazeArray, foundRoads);
};

const createAnswer = (mazeArray: boolean[][], roads: Point[]) => {
  let foundRoads = [...roads];
  let nextPoints = getNextPoints(mazeArray, foundRoads);
  while (nextPoints.length === 1) {
    foundRoads = [...foundRoads, nextPoints[0]];
    nextPoints = getNextPoints(mazeArray, foundRoads);
  }
  const defaultAnswer = { reach: foundRoads, longest: foundRoads };
  return nextPoints.reduce((pre, nextPoint) => {
    const afterBranch = [...foundRoads, nextPoint];
    const deadEnd = createAnswer(mazeArray, afterBranch) as Road;
    const [, reachLastY] = deadEnd.reach[deadEnd.reach.length - 1];
    const reach = reachLastY === 0 ? deadEnd.reach : pre.reach;
    const isUpdateLongest = pre.longest.length < deadEnd.longest.length;
    const longest = isUpdateLongest ? deadEnd.longest : pre.longest;
    return { reach, longest };
  }, defaultAnswer);
};

const getNextPoints = (mazeArray: boolean[][], foundRoads: Point[]) => {
  const [[currentX, currentY], [preX, preY]] = [...foundRoads].reverse();
  return DIRECTIONS.map(([x, y]) => [currentX + x, currentY + y]).filter(
    ([x, y]) => y >= 0 && mazeArray[y][x] && !(x === preX && y === preY),
  ) as Point[];
};

export { findAnswer };
