import {
  TypedUseSelectorHook,
  useSelector as useSelectorRaw,
  shallowEqual,
} from 'react-redux';
import { Store } from '../modules/store';

const useShallowEqualSelector: TypedUseSelectorHook<Store> = (selector) =>
  useSelectorRaw(selector, shallowEqual);

export { useShallowEqualSelector };
