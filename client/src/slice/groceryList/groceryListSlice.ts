// Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Authentication
import { getAuthToken } from '../../app/auth';
// Fetch - Slice - Store
import { RootState } from '../../app/store';
import { fetchGetGroceryList, GroceryListInformation, fetchGetShareGroceryList } from './groceryListFetch';
import {
    checkTrueGroceryList,
    checkFalseGroceryList,
    checkTrueShareGroceryList,
    checkFalseShareGroceryList,
} from '../groceriesLists/groceriesListsSlice';

// Thunk - get a grocery list
export const getGroceryList = createAsyncThunk(`/api/groceriesLists/:id`, async (groceryListId: number) => {
    const idToken = await getAuthToken();
    const groceryList = await fetchGetGroceryList(idToken, groceryListId);
    return groceryList;
});

// Thunk - get a shared grocery list
export const getShareGroceryList = createAsyncThunk(
    `/api/groceriesLists/share/:share_uid`,
    async (shareUid: string) => {
        const groceryList = await fetchGetShareGroceryList(shareUid);
        return groceryList;
    },
);

type GroceryList = {
    groceryList: GroceryListInformation;
};

const initialState: GroceryList = {
    groceryList: {
        id: 0,
        name: '',
        share_uid: '',
        ingredients: [],
        recipes: [],
    },
};

const groceryListReducer = createSlice({
    name: 'groceryList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getGroceryList - fulfilled
        builder.addCase(getGroceryList.fulfilled, (state, action) => {
            state.groceryList = action.payload;
        });
        // checkTrueGroceryList - fulfilled
        builder.addCase(checkTrueGroceryList.fulfilled, (state, action) => {
            const unityId = action.payload.unityId;
            const ingredientId = action.payload.ingredientId;
            state.groceryList.ingredients = state.groceryList.ingredients.map((ingredient) => {
                if (ingredient.ingredient_id === ingredientId && ingredient.unity_id === unityId) {
                    ingredient.checked = 1;
                }
                return ingredient;
            });
        });
        // checkFalseGroceryList - fulfilled
        builder.addCase(checkFalseGroceryList.fulfilled, (state, action) => {
            const ingredientId = action.payload.ingredientId;
            const unityId = action.payload.unityId;
            state.groceryList.ingredients = state.groceryList.ingredients.map((ingredient) => {
                if (ingredient.ingredient_id === ingredientId && ingredient.unity_id === unityId) {
                    ingredient.checked = 0;
                }
                return ingredient;
            });
        });
        // getShareGroceryList - fulfilled
        builder.addCase(getShareGroceryList.fulfilled, (state, action) => {
            state.groceryList = action.payload;
        });
        // checkTrueShareGroceryList - fulfilled
        builder.addCase(checkTrueShareGroceryList.fulfilled, (state, action) => {
            const unityId = action.payload.unityId;
            const ingredientId = action.payload.ingredientId;
            state.groceryList.ingredients = state.groceryList.ingredients.map((ingredient) => {
                if (ingredient.ingredient_id === ingredientId && ingredient.unity_id === unityId) {
                    ingredient.checked = 1;
                }
                return ingredient;
            });
        });

        // checkFalseShareGroceryList - fulfilled
        builder.addCase(checkFalseShareGroceryList.fulfilled, (state, action) => {
            const unityId = action.payload.unityId;
            const ingredientId = action.payload.ingredientId;
            state.groceryList.ingredients = state.groceryList.ingredients.map((ingredient) => {
                if (ingredient.ingredient_id === ingredientId && ingredient.unity_id === unityId) {
                    ingredient.checked = 0;
                }
                return ingredient;
            });
        });
    },
});

export const selectGroceryList = (state: RootState): GroceryListInformation => state.groceryList.groceryList;

export default groceryListReducer.reducer;
