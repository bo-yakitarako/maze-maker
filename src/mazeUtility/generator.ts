type Point = [number, number];

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const generate = (size: number) => {
  const width = size + 3;
  const maze = [...Array(width)].map(() => [...Array(width)].map(() => false));
  maze[width - 1][1] = maze[width - 2][1] = true; // eslint-disable-line no-multi-assign
  let diggableRoads = [[1, width - 2]] as Point[];
  while (diggableRoads.length > 0) {
    diggableRoads = dig(maze, diggableRoads);
  }
  maze[0][width - 2] = true;
  return maze;
};

export { generate, DIRECTIONS, Point };

/* eslint-disable no-param-reassign */
const dig = (maze: boolean[][], diggableRoads: Point[]) => {
  const firstLoadIndex = Math.floor(Math.random() * diggableRoads.length);
  const digPosition = diggableRoads[firstLoadIndex];
  let nextPositions = getNextPositions(maze, digPosition);
  while (nextPositions.length > 0) {
    const positionIndex = Math.floor(Math.random() * nextPositions.length);
    const { pre, next } = nextPositions[positionIndex];
    maze[pre[1]][pre[0]] = maze[next[1]][next[0]] = true; // eslint-disable-line no-multi-assign
    diggableRoads = [...diggableRoads, next];
    nextPositions = getNextPositions(maze, next);
  }
  return diggableRoads.filter(
    (roadPoint) => getNextPositions(maze, roadPoint).length !== 0,
  );
};

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
