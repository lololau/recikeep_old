import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getGroceryList, GroceryListInformation, getLatestGroceryList } from './groceryListFetch';
import { fetchCheckTrueGroceryList, fetchCheckFalseGroceryList } from '../groceriesLists/groceriesListsSlice';

export const fetchGetAGroceryList = createAsyncThunk(
    `/api/groceriesLists/:id`,
    async (groceryListId: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const groceryList = await getGroceryList(state.user.idToken, groceryListId);
        return groceryList;
    },
);

export const fetchGetLatestGroceryList = createAsyncThunk(`/api/groceriesLists/`, async (idToken: string) => {
    const groceryList = await getLatestGroceryList(idToken);
    return groceryList;
});

type GroceryList = {
    groceryList: GroceryListInformation;
};

const initialState: GroceryList = {
    groceryList: {
        id: 0,
        name: '',
        ingredients: [],
    },
};

const groceryListReducer = createSlice({
    name: 'groceryList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetchGetGroceryList
        builder.addCase(fetchGetAGroceryList.fulfilled, (state, action) => {
            state.groceryList = action.payload;
        });
        // fetchGetLatestGroceryList
        builder.addCase(fetchGetLatestGroceryList.fulfilled, (state, action) => {
            state.groceryList = action.payload;
        });
        // fetchCheckTrueGroceryList
        builder.addCase(fetchCheckTrueGroceryList.fulfilled, (state, action) => {
            const ingredientId = action.payload.ingredientId;
            state.groceryList.ingredients = state.groceryList.ingredients.map((ingredient) => {
                if (ingredient.ingredient_id === ingredientId) {
                    ingredient.checked = 1;
                }
                return ingredient;
            });
        });
        // fetchCheckFalseGroceryList
        builder.addCase(fetchCheckFalseGroceryList.fulfilled, (state, action) => {
            const ingredientId = action.payload.ingredientId;
            state.groceryList.ingredients = state.groceryList.ingredients.map((ingredient) => {
                if (ingredient.ingredient_id === ingredientId) {
                    ingredient.checked = 0;
                }
                return ingredient;
            });
        });
    },
});

export const selectGroceryList = (state: RootState): GroceryListInformation => state.groceryList.groceryList;

export default groceryListReducer.reducer;
