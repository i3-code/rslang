import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import savannahGameReducer from './Games/Savannah/savannahSlice';
import userReducer from '../redux/userSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    savannahGame: savannahGameReducer,
    user: userReducer,
  },
});
