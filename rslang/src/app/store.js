import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import savannahGameReducer from './Games/Savannah/savannahSlice';
import userReducer from '../redux/userSlice';
import appReducer from '../appSlice';
import bookReducer from './Book/bookSlice';
import myGame from './Games/MyGame/myGameSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    savannahGame: savannahGameReducer,
    user: userReducer,
    app: appReducer,
    book: bookReducer,
    myGame: myGame,
  },
});
