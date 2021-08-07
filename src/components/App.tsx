import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core';
import { MazeCanvas } from './MazeCanvas';
import { Settings } from './Settings';

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <AppWrapper>
        <MazeCanvas />
        <Settings />
      </AppWrapper>
    </StylesProvider>
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
