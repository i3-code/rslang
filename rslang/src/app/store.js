import { configureStore } from '@reduxjs/toolkit';
import savannahGameReducer from './Games/Savannah/savannahSlice';
import userReducer from '../redux/userSlice';
import appReducer from '../redux/appSlice';
import bookReducer from './Book/bookSlice';

export default configureStore({
  reducer: {
    savannahGame: savannahGameReducer,
    user: userReducer,
    app: appReducer,
    book: bookReducer,
  },
});
