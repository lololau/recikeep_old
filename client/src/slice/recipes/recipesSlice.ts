import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Recipe, RequestAddRecipe, addRecipe, getAllRecipes } from './recipesFetch';

export const fetchAddRecipe = createAsyncThunk('/api/recipes/add', async (request: RequestAddRecipe, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const recipe = await addRecipe(state.user.idToken, request);
    return recipe;
});

export const fetchGetAllRecipes = createAsyncThunk('/api/recipes/getAll', async (idToken: string) => {
    const recipes = await getAllRecipes(idToken);
    return recipes;
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
    },
});

export const selectRecipes = (state: RootState): Recipe[] => state.recipes.recipes;
export const selectRecipe = (state: RootState, index: number): Recipe => state.recipes.recipes[index];

export default recipesReducer.reducer;
