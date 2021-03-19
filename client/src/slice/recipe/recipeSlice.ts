import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getOneRecipe, RecipeInformation, RequestUpdateRecipe, updateRecipe } from './recipeFetch';

export const fetchGetARecipe = createAsyncThunk(`/api/recipes/:id`, async (recipeId: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const recipe = await getOneRecipe(state.user.idToken, recipeId);
    return recipe;
});

export const fetchUpdateRecipe = createAsyncThunk(
    `/api/recipes/update/:id`,
    async (req: RequestUpdateRecipe, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const recipe = await updateRecipe(state.user.idToken, req);
        return recipe;
    },
);

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
        // fetchGetRecipes
        builder.addCase(fetchGetARecipe.fulfilled, (state, action) => {
            state.recipe = action.payload;
        });
        // fetchUpdateRecipe
        builder.addCase(fetchUpdateRecipe.fulfilled, (state, action) => {
            state.recipe = action.payload;
        });
    },
});

export const selectRecipe = (state: RootState): RecipeInformation => state.recipe.recipe;

export default recipeReducer.reducer;
