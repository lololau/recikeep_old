// Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Authentication
import { getAuthToken } from '../../app/auth';
// Fetch - Store
import { RootState } from '../../app/store';
import { Recipe, RequestAddRecipe, fetchAddRecipe, fetchDeleteRecipe, fetchGetAllRecipes } from './recipesFetch';

// Thunk - add a recipe
export const addRecipe = createAsyncThunk('/api/recipes/add', async (request: RequestAddRecipe) => {
    const idToken = await getAuthToken();
    const recipe = await fetchAddRecipe(idToken, request);
    console.log('recipe: ', recipe);
    return recipe;
});

// Thunk - get all recipes
export const getAllRecipes = createAsyncThunk('/api/recipes/getAll', async () => {
    const idToken = await getAuthToken();
    const recipes = await fetchGetAllRecipes(idToken);
    return recipes;
});

// Thunk - delete a recipe
export const deleteRecipe = createAsyncThunk(`/api/recipes/delete`, async (recipeId: number) => {
    const idToken = await getAuthToken();
    await fetchDeleteRecipe(idToken, recipeId);
    return recipeId;
});

type RecipeList = {
    recipes: Recipe[];
};

const initialState: RecipeList = {
    recipes: [],
};

const recipesReducer = createSlice({
    name: 'recipes',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllRecipes - fulfilled
        builder.addCase(getAllRecipes.fulfilled, (state, action) => {
            state.recipes = action.payload;
        });
        // getAllRecipes - rejected
        builder.addCase(getAllRecipes.rejected, (state) => {
            state.recipes = [];
        });
        // addRecipe - fulfilled
        builder.addCase(addRecipe.fulfilled, (state, action) => {
            state.recipes.push(action.payload);
        });
        // deleteRecipe - fulfilled
        builder.addCase(deleteRecipe.fulfilled, (state, action) => {
            state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
        });
    },
});

export const selectRecipes = (state: RootState): Recipe[] => state.recipes.recipes;
export const selectRecipe = (state: RootState, index: number): Recipe => state.recipes.recipes[index];

export default recipesReducer.reducer;
