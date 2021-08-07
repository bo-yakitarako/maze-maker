import styled from 'styled-components';
import { Button, Slider, TextField, MenuItem } from '@material-ui/core';
import { useSettings, digIntervals } from '../hooks/useSettings';

const Settings: React.FC = () => {
  const {
    size,
    mainButtonText,
    handleMainButton,
    digIntervalIndex,
    handleDigInterval,
    handleSizeSelect,
  } = useSettings();

  const disabled = mainButtonText === '押さないで';

  return (
    <Wrapper>
      <Button
        onClick={handleMainButton}
        color="primary"
        variant="outlined"
        disabled={disabled}
      >
        {mainButtonText}
      </Button>
      <FormWrapper>
        <StyledSelect
          select
          disabled={disabled}
          label="迷路サイズ"
          variant="outlined"
          value={`${size}`}
          onChange={handleSizeSelect}
        >
          {[11, 21, 31, 41, 51].map((value) => (
            <MenuItem key={value} value={`${value}`}>
              {value}
            </MenuItem>
          ))}
        </StyledSelect>
        <StyledSlider
          value={digIntervalIndex}
          min={0}
          max={digIntervals.length - 1}
          step={1}
          onChange={handleDigInterval}
        />
      </FormWrapper>
    </Wrapper>
  );
};

export { Settings };

const Wrapper = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 300px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

const StyledSelect = styled(TextField)`
  width: 100px;
  margin-right: 16px;
  text-align: left;
`;

const StyledSlider = styled(Slider)`
  width: 140px;
`;
