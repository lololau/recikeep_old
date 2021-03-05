import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Ingredient } from './ingredientsFetch';

type IngredientsList = {
    ingredients: Ingredient[];
};

const initialState: IngredientsList = {
    ingredients: [
        { name: 'Patate', id: 0 },
        { name: 'Ananas', id: 1 },
        { name: 'Banane', id: 2 },
        { name: 'Garry', id: 3 },
    ],
};

/* export const fetchSearchIngredients = createAsyncThunk(
    '/api/ingredients/search/:searchTerm',
    async (searchTerm: string, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const ingredients = await SearchIngredients(state.user.idToken, searchTerm);
        console.log(ingredients);
        return ingredients;
    },
); */

const ingredientsReducer = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {},
});

export const selectIngredients = (state: RootState): Ingredient[] => state.ingredients.ingredients;
export const selectIngredient = (state: RootState, index: number): Ingredient => state.ingredients.ingredients[index];

export default ingredientsReducer.reducer;
