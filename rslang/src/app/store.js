import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import savannahGameReducer from './Games/Savannah/savannahSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    savannahGame: savannahGameReducer
  },
});
