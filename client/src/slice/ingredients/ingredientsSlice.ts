import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Ingredient, getIngredients } from './ingredientsFetch';

type IngredientsList = {
    ingredients: Ingredient[];
};

const initialState: IngredientsList = {
    ingredients: [],
};

export const fetchGetIngredients = createAsyncThunk('/api/ingredients/search/getAll', async (idToken: string) => {
    const ingredients = await getIngredients(idToken);
    return ingredients;
});

const ingredientsReducer = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetchGetIngredients
        builder.addCase(fetchGetIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
        });
        builder.addCase(fetchGetIngredients.rejected, (state) => {
            state.ingredients = [];
        });
    },
});

export const ingredients = (state: RootState): Ingredient[] => state.ingredients.ingredients;
export const selectIngredient = (state: RootState, index: number): Ingredient => state.ingredients.ingredients[index];

export default ingredientsReducer.reducer;
