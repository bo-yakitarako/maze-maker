import { generateMedia } from 'styled-media-query';

const BREAKPOINT = {
  HUGE: 1440,
  LARGE: 1170,
  MEDIUM: 768,
  SMALL: 450,
  TINY: 360,
} as const;

const media = generateMedia({
  huge: `${BREAKPOINT.HUGE}px`,
  large: `${BREAKPOINT.LARGE}px`,
  medium: `${BREAKPOINT.MEDIUM}px`,
  small: `${BREAKPOINT.SMALL}px`,
  tiny: `${BREAKPOINT.TINY}px`,
});

export { BREAKPOINT, media };
