import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface Recipe {
    id: number;
    name: string;
    user_id: number;
    recipe_photo?: number;
    presentation?: string;
    recipe_description?: number;
    number_parts: number;
    time_presentation?: string;
    time_cooking?: string;
}

type RecipeList = {
    recipes: Recipe[];
};

const PateCarbo: Recipe = {
    id: 0,
    name: 'Pâtes Carbonnara',
    user_id: 1,
    number_parts: 2,
};

const PateSaumon: Recipe = {
    id: 1,
    name: 'Pâtes au saumon',
    user_id: 2,
    number_parts: 2,
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
