import { configureStore } from '@reduxjs/toolkit';
import savannahGameReducer from './Games/Savannah/savannahSlice';
import userReducer from '../redux/userSlice';
import appReducer from '../redux/appSlice';
import bookReducer from './Book/bookSlice';
import myGame from './Games/MyGame/myGameSlice';
import addGame from './Games/AdditionalGame/addGameSlice';

export default configureStore({
  reducer: {
    savannahGame: savannahGameReducer,
    user: userReducer,
    app: appReducer,
    book: bookReducer,
    myGame: myGame,
    addGame: addGame,
  },
});
