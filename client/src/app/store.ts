import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import recipesReducer from '../slice/recipes/recipesSlice';
import ingredientsReducer from '../slice/ingredients/ingredientsSlice';
import userReducer from '../slice/user/userSlice';
import groupsReducer from '../slice/groups/groupsSlice';
import unitiesReducer from '../slice/unity/unitySlice';
import recipeReducer from '../slice/recipe/recipeSlice';
import groceriesListsReducer from '../slice/groceriesLists/groceriesListsSlice';
import groceryListReducer from '../slice/groceryList/groceryListSlice';
import loggerMiddleware from './logger';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        recipe: recipeReducer,
        ingredients: ingredientsReducer,
        unities: unitiesReducer,
        user: userReducer,
        groups: groupsReducer,
        groceriesLists: groceriesListsReducer,
        groceryList: groceryListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
