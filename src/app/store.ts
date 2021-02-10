import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slice/counterSlice';
import recipesReducer from '../slice/recipesSlice';
import ingredientsReducer from '../slice/ingredientsSlice';
import userReducer from '../slice/userSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        recipes: recipesReducer,
        ingredients: ingredientsReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
