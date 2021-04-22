// Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Authentication
import { RootState } from '../../app/store';
// Fetch - Store
import { getAuthToken } from '../../app/auth';
import {
    Ingredient,
    RequestAddIngredient,
    fetchGetIngredients,
    fetchAddIngredient,
    fetchDeleteIngredient,
} from './ingredientsFetch';

// Thunk - get all ingredients
export const getAllIngredients = createAsyncThunk('/api/ingredients/getAll', async () => {
    const idToken = await getAuthToken();
    const ingredients = await fetchGetIngredients(idToken);
    return ingredients;
});

// Thunk - add an ingredient
export const addIngredient = createAsyncThunk('/api/ingredients/add', async (req: RequestAddIngredient) => {
    const idToken = await getAuthToken();
    const ingredient = await fetchAddIngredient(idToken, req);
    return ingredient;
});

// Thunk - delete an ingredient
export const deleteIngredient = createAsyncThunk('/api/ingredients/delete', async (ingredientId: number) => {
    const idToken = await getAuthToken();
    await fetchDeleteIngredient(idToken, ingredientId);
    return ingredientId;
});

type IngredientsList = {
    ingredients: Ingredient[];
};

const initialState: IngredientsList = {
    ingredients: [],
};

const ingredientsReducer = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAllIngredients - fulfilled
        builder.addCase(getAllIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
        });
        // getAllIngredients - rejected
        builder.addCase(getAllIngredients.rejected, (state) => {
            state.ingredients = [];
        });
        // addIngredient - fulfilled
        builder.addCase(addIngredient.fulfilled, (state, action) => {
            state.ingredients.push(action.payload);
        });
        // deleteIngredient - fulfilled
        builder.addCase(deleteIngredient.fulfilled, (state, action) => {
            state.ingredients = state.ingredients.filter((ingredient) => ingredient.id !== action.payload);
        });
    },
});

export const ingredients = (state: RootState): Ingredient[] => state.ingredients.ingredients;
export const selectIngredient = (state: RootState, index: number): Ingredient => state.ingredients.ingredients[index];

export default ingredientsReducer.reducer;
