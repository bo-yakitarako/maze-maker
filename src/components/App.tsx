import styled from 'styled-components';
import { MazeCanvas } from './MazeCanvas';

const App: React.FC = () => {
  return (
    <AppWrapper>
      <MazeCanvas />
    </AppWrapper>
  );
};

export { App };

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;
