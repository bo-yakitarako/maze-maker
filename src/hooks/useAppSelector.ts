import {
  TypedUseSelectorHook,
  useSelector as useSelectorRaw,
} from 'react-redux';
import { Store } from '../modules/store';

const useAppSelector: TypedUseSelectorHook<Store> = useSelectorRaw;

export { useAppSelector };
