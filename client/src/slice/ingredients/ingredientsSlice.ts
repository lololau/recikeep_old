import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Ingredient, RequestAddIngredient, getIngredients, addIngredient, deleteIngredient } from './ingredientsFetch';

export const fetchGetIngredients = createAsyncThunk('/api/ingredients/getAll', async (idToken: string) => {
    const ingredients = await getIngredients(idToken);
    return ingredients;
});

export const fetchAddIngredient = createAsyncThunk(
    '/api/ingredients/add',
    async (req: RequestAddIngredient, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const ingredient = await addIngredient(state.user.idToken, req);
        return ingredient;
    },
);

export const fetchDeleteIngredient = createAsyncThunk('/api/unities/delete', async (ingredientId: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    await deleteIngredient(state.user.idToken, ingredientId);
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
        // fetchGetIngredients
        builder.addCase(fetchGetIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
        });
        builder.addCase(fetchGetIngredients.rejected, (state) => {
            state.ingredients = [];
        });
        // fetchAddIngredient
        builder.addCase(fetchAddIngredient.fulfilled, (state, action) => {
            state.ingredients.push(action.payload);
        });
        // fetchDeleteIngredient
        builder.addCase(fetchDeleteIngredient.fulfilled, (state, action) => {
            state.ingredients = state.ingredients.filter((ingredient) => ingredient.id !== action.payload);
        });
    },
});

export const ingredients = (state: RootState): Ingredient[] => state.ingredients.ingredients;
export const selectIngredient = (state: RootState, index: number): Ingredient => state.ingredients.ingredients[index];

export default ingredientsReducer.reducer;
