import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Ingredient, GetAllIngredients } from './ingredientsFetch';

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

const ingredientsReducer = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {},
});

export const fetchGetAllIngredients = createAsyncThunk(
    '/api/ingredients/getAllIngredients',
    async (idToken: string) => {
        const user = await GetAllIngredients(idToken);
        return user;
    },
);

export const selectIngredients = (state: RootState): Ingredient[] => state.ingredients.ingredients;
export const selectIngredient = (state: RootState, index: number): Ingredient => state.ingredients.ingredients[index];

export default ingredientsReducer.reducer;
