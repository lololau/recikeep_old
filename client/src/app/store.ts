import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../slice/recipes/recipesSlice';
import ingredientsReducer from '../slice/ingredients/ingredientsSlice';
import userReducer from '../slice/user/userSlice';
import groupsReducer from '../slice/groups/groupsSlice';
import unitiesReducer from '../slice/unity/unitySlice';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        ingredients: ingredientsReducer,
        unities: unitiesReducer,
        user: userReducer,
        groups: groupsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
