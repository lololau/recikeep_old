import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slice/counterSlice';
import recipesReducer from '../slice/recipeSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        recipes: recipesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
