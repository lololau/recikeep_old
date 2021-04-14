import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
    addGroceryList,
    GroceryList,
    RequestAddGroceryList,
    getAllGroceries,
    deleteGroceryList,
    RequestCheckTrueGroceryList,
    checkTrueGroceryList,
    RequestCheckFalseGroceryList,
    checkFalseGroceryList,
} from './groceriesListsFetch';

export const fetchAddGroceryList = createAsyncThunk(
    '/api/groceriesLists/add',
    async (request: RequestAddGroceryList, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const groceryList = await addGroceryList(state.user.idToken, request);
        console.log('Grocery list: ', groceryList);
        return groceryList;
    },
);

export const fetchGetAllGroceries = createAsyncThunk('/api/groceriesLists/getAll', async (idToken: string) => {
    const groceriesLists = await getAllGroceries(idToken);
    return groceriesLists;
});

export const fetchDeleteRecipe = createAsyncThunk(
    `/api/groceriesLists/delete`,
    async (groceryListId: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        await deleteGroceryList(state.user.idToken, groceryListId);
        return groceryListId;
    },
);

export const fetchCheckTrueGroceryList = createAsyncThunk(
    `/api/groceriesLists/updateTrue`,
    async (request: RequestCheckTrueGroceryList, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        return await checkTrueGroceryList(state.user.idToken, request);
    },
);

export const fetchCheckFalseGroceryList = createAsyncThunk(
    `/api/groceriesLists/updateFalse`,
    async (request: RequestCheckFalseGroceryList, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        return await checkFalseGroceryList(state.user.idToken, request);
    },
);

type Groceries = {
    groceriesLists: GroceryList[];
};

const initialState: Groceries = {
    groceriesLists: [],
};

const groceriesListsReducer = createSlice({
    name: 'groceriesLists',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetchGetRecipes
        builder.addCase(fetchAddGroceryList.fulfilled, (state, action) => {
            state.groceriesLists.push(action.payload);
        });
        // fetchGetRecipes
        builder.addCase(fetchGetAllGroceries.fulfilled, (state, action) => {
            state.groceriesLists = action.payload;
        });
        builder.addCase(fetchGetAllGroceries.rejected, (state) => {
            state.groceriesLists = [];
        });
        // fetchDeleteRecipe
        builder.addCase(fetchDeleteRecipe.fulfilled, (state, action) => {
            state.groceriesLists = state.groceriesLists.filter((groceryList) => groceryList.id !== action.payload);
        });
    },
});

export const selectGroceriesList = (state: RootState): GroceryList[] => state.groceriesLists.groceriesLists;

export default groceriesListsReducer.reducer;
