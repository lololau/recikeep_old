import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slice/counterSlice';
import recipesReducer from '../slice/recipesSlice';
import ingredientsReducer from '../slice/ingredientsSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        recipes: recipesReducer,
        ingredients: ingredientsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
