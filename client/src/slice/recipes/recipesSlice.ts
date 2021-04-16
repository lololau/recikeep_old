import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAuthToken } from '../../app/auth';
import { Recipe, RequestAddRecipe, addRecipe, deleteRecipe, getAllRecipes } from './recipesFetch';

export const fetchAddRecipe = createAsyncThunk('/api/recipes/add', async (request: RequestAddRecipe) => {
    const idToken = await getAuthToken();
    const recipe = await addRecipe(idToken, request);
    console.log('recipe: ', recipe);
    return recipe;
});

export const fetchGetAllRecipes = createAsyncThunk('/api/recipes/getAll', async () => {
    const idToken = await getAuthToken();
    const recipes = await getAllRecipes(idToken);
    return recipes;
});

export const fetchDeleteRecipe = createAsyncThunk(`/api/recipes/delete`, async (recipeId: number) => {
    const idToken = await getAuthToken();
    await deleteRecipe(idToken, recipeId);
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
        // fetchGetRecipes
        builder.addCase(fetchGetAllRecipes.fulfilled, (state, action) => {
            state.recipes = action.payload;
        });
        builder.addCase(fetchGetAllRecipes.rejected, (state) => {
            state.recipes = [];
        });
        // fetchAddRecipe
        builder.addCase(fetchAddRecipe.fulfilled, (state, action) => {
            state.recipes.push(action.payload);
        });
        // fetchDeleteRecipe
        builder.addCase(fetchDeleteRecipe.fulfilled, (state, action) => {
            state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
        });
    },
});

export const selectRecipes = (state: RootState): Recipe[] => state.recipes.recipes;
export const selectRecipe = (state: RootState, index: number): Recipe => state.recipes.recipes[index];

export default recipesReducer.reducer;
