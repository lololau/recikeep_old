// Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Authentication
import { getAuthToken } from '../../app/auth';
// Fetch - Store
import { RootState } from '../../app/store';
import { fetchGetOneRecipe, RecipeInformation, RequestUpdateRecipe, fetchUpdateRecipe } from './recipeFetch';

// Thunk - get a recipe
export const getRecipe = createAsyncThunk(`/api/recipes/:id`, async (recipeId: number) => {
    const idToken = await getAuthToken();
    const recipe = await fetchGetOneRecipe(idToken, recipeId);
    return recipe;
});

// Thunk - update a recipe
export const updateARecipe = createAsyncThunk(`/api/recipes/update/:id`, async (req: RequestUpdateRecipe) => {
    const idToken = await getAuthToken();
    const recipe = await fetchUpdateRecipe(idToken, req);
    return recipe;
});

type Recipe = {
    recipe: RecipeInformation;
};

const initialState: Recipe = {
    recipe: {
        name: '',
        number_parts: 0,
        ingredients: [],
    },
};

const recipeReducer = createSlice({
    name: 'recipe',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getRecipe - fulfilled
        builder.addCase(getRecipe.fulfilled, (state, action) => {
            state.recipe = action.payload;
        });
        // updateARecipe - fulfilled
        builder.addCase(updateARecipe.fulfilled, (state, action) => {
            state.recipe = action.payload;
        });
    },
});

export const selectRecipe = (state: RootState): RecipeInformation => state.recipe.recipe;

export default recipeReducer.reducer;
