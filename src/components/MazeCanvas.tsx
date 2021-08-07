import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { getCanvasWidth, useDrawingMaze } from '../hooks/useDrawingMaze';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { app } from '../modules/app';

const MazeCanvas: React.FC = () => {
  const dispatch = useDispatch();
  const mazeSize = useAppSelector(({ maze }) => maze.length);
  const { windowWidth } = useMediaQuery();
  const canvasSize = getCanvasWidth(mazeSize, windowWidth);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDrawingMaze(canvasRef.current as HTMLCanvasElement);

  useEffect(() => {
    dispatch(app.actions.initializeMaze());
  }, []);

  return (
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
  );
};

export { MazeCanvas };
