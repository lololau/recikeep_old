// Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Authentication
import { getAuthToken } from '../../app/auth';
// Fetch - Store
import { RootState } from '../../app/store';
import {
    fetchAddGroceryList,
    GroceryList,
    RequestAddGroceryList,
    fetchGetAllGroceries,
    fetchDeleteGroceryList,
    RequestCheckTrueGroceryList,
    fetchCheckTrueGroceryList,
    RequestCheckFalseGroceryList,
    fetchCheckFalseGroceryList,
    RequestCheckShareGroceryList,
    fetchCheckTrueShareGroceryList,
    fetchCheckFalseShareGroceryList,
} from './groceriesListsFetch';

export const addGroceryList = createAsyncThunk('/api/groceriesLists/add', async (request: RequestAddGroceryList) => {
    const idToken = await getAuthToken();
    const groceryList = await fetchAddGroceryList(idToken, request);
    console.log('Grocery list: ', groceryList);
    return groceryList;
});

export const getAllGroceries = createAsyncThunk('/api/groceriesLists/getAll', async () => {
    const idToken = await getAuthToken();
    const groceriesLists = await fetchGetAllGroceries(idToken);
    return groceriesLists;
});

export const deleteGroceryList = createAsyncThunk(`/api/groceriesLists/delete`, async (groceryListId: number) => {
    const idToken = await getAuthToken();
    await fetchDeleteGroceryList(idToken, groceryListId);
    return groceryListId;
});

export const checkTrueGroceryList = createAsyncThunk(
    `/api/groceriesLists/update/true`,
    async (request: RequestCheckTrueGroceryList) => {
        const idToken = await getAuthToken();
        return await fetchCheckTrueGroceryList(idToken, request);
    },
);

export const checkFalseGroceryList = createAsyncThunk(
    `/api/groceriesLists/update/false`,
    async (request: RequestCheckFalseGroceryList) => {
        const idToken = await getAuthToken();
        return await fetchCheckFalseGroceryList(idToken, request);
    },
);

export const checkTrueShareGroceryList = createAsyncThunk(
    `/api/groceriesLists/updateShare/true`,
    async (request: RequestCheckShareGroceryList) => {
        return await fetchCheckTrueShareGroceryList(request);
    },
);

export const checkFalseShareGroceryList = createAsyncThunk(
    `/api/groceriesLists/updateShare/false`,
    async (request: RequestCheckShareGroceryList) => {
        return await fetchCheckFalseShareGroceryList(request);
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
        builder.addCase(addGroceryList.fulfilled, (state, action) => {
            state.groceriesLists.push(action.payload);
        });
        // fetchGetRecipes
        builder.addCase(getAllGroceries.fulfilled, (state, action) => {
            state.groceriesLists = action.payload;
        });
        builder.addCase(getAllGroceries.rejected, (state) => {
            state.groceriesLists = [];
        });
        // fetchDeleteRecipe
        builder.addCase(deleteGroceryList.fulfilled, (state, action) => {
            state.groceriesLists = state.groceriesLists.filter((groceryList) => groceryList.id !== action.payload);
        });
    },
});

export const selectGroceriesList = (state: RootState): GroceryList[] => state.groceriesLists.groceriesLists;

export default groceriesListsReducer.reducer;
