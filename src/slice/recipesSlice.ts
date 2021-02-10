import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface Recipe {
    id: number;
    name: string;
    user_id: string;
    recipe_photo?: number;
    presentation?: string;
    recipe_description?: number;
    number_parts: number;
    time_presentation?: string;
    time_cooking?: string;
    date_creation: Date;
    date_update: Date;
}

type RecipeList = {
    recipes: Recipe[];
};

const PateCarbo: Recipe = {
    id: 0,
    name: 'Pâtes Carbonnara',
    user_id: 'lolo',
    number_parts: 2,
    date_creation: new Date(2021, 2, 8),
    date_update: new Date(2021, 2, 8),
};

const PateSaumon: Recipe = {
    id: 1,
    name: 'Pâtes au saumon',
    user_id: 'lolo',
    number_parts: 2,
    date_creation: new Date(2021, 2, 8),
    date_update: new Date(2021, 2, 8),
};

const initialState: RecipeList = {
    recipes: [PateCarbo, PateSaumon],
};

const recipesReducer = createSlice({
    name: 'recipes',
    initialState: initialState,
    reducers: {},
});

export const selectRecipes = (state: RootState): Recipe[] => state.recipes.recipes;
export const selectRecipe = (state: RootState, index: number): Recipe => state.recipes.recipes[index];

export default recipesReducer.reducer;
