import type { AppDispatch } from '@/redux/index';
import {useDispatch as useOriginDispatch} from 'react-redux';
export const useDispatch = () => useOriginDispatch<AppDispatch>();