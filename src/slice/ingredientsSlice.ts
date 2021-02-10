import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface Ingredient {
    id: number;
    name: string;
    date_creation: Date;
    date_update: Date;
}

type IngredientsList = {
    ingredients: Ingredient[];
};

const initialState: IngredientsList = {
    ingredients: [
        { name: 'Patate', id: 0, date_creation: new Date(2021, 2, 10), date_update: new Date(2021, 2, 10) },
        { name: 'Ananas', id: 1, date_creation: new Date(2021, 2, 10), date_update: new Date(2021, 2, 10) },
        { name: 'Banane', id: 2, date_creation: new Date(2021, 2, 10), date_update: new Date(2021, 2, 10) },
    ],
};

const ingredientsReducer = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {},
});

export const selectIngredients = (state: RootState): Ingredient[] => state.ingredients.ingredients;
export const selectIngredient = (state: RootState, index: number): Ingredient => state.ingredients.ingredients[index];

export default ingredientsReducer.reducer;
