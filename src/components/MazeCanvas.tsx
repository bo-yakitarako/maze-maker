import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  displayStartPoints,
  finish,
  startMazeCreation,
} from '../actions/asyncActions';
import { useAppSelector } from '../hooks/useAppSelector';
import { useDiggingMaze } from '../hooks/useDiggingMaze';
import { getCanvasWidth, useDrawingMaze } from '../hooks/useDrawingMaze';
import { useMediaQuery } from '../hooks/useMediaQuery';

const MazeCanvas: React.FC = () => {
  const dispatch = useDispatch();
  const [mazeSize, step] = useAppSelector(({ maze, step }) => [
    maze.length,
    step,
  ]);
  const { windowWidth } = useMediaQuery();
  const canvasSize = getCanvasWidth(mazeSize, windowWidth);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDrawingMaze(canvasRef.current as HTMLCanvasElement);

  const { dig } = useDiggingMaze();

  useEffect(() => {
    switch (step) {
      case 'start':
        dispatch(startMazeCreation());
        break;
      case 'dig':
        dig();
        break;
      case 'selectNextStartPoint':
        dispatch(displayStartPoints());
        break;
      case 'finish':
        dispatch(finish());
        break;
      default:
        break;
    }
  }, [step]);

  return (
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
  );
};

export { MazeCanvas };
