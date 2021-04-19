import { getAuthToken } from '../../app/auth';
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
    RequestCheckShareGroceryList,
    checkTrueShareGroceryList,
    checkFalseShareGroceryList,
} from './groceriesListsFetch';

export const fetchAddGroceryList = createAsyncThunk(
    '/api/groceriesLists/add',
    async (request: RequestAddGroceryList) => {
        const idToken = await getAuthToken();
        const groceryList = await addGroceryList(idToken, request);
        console.log('Grocery list: ', groceryList);
        return groceryList;
    },
);

export const fetchGetAllGroceries = createAsyncThunk('/api/groceriesLists/getAll', async () => {
    const idToken = await getAuthToken();
    const groceriesLists = await getAllGroceries(idToken);
    return groceriesLists;
});

export const fetchDeleteRecipe = createAsyncThunk(`/api/groceriesLists/delete`, async (groceryListId: number) => {
    const idToken = await getAuthToken();
    await deleteGroceryList(idToken, groceryListId);
    return groceryListId;
});

export const fetchCheckTrueGroceryList = createAsyncThunk(
    `/api/groceriesLists/update/true`,
    async (request: RequestCheckTrueGroceryList) => {
        const idToken = await getAuthToken();
        return await checkTrueGroceryList(idToken, request);
    },
);

export const fetchCheckFalseGroceryList = createAsyncThunk(
    `/api/groceriesLists/update/false`,
    async (request: RequestCheckFalseGroceryList) => {
        const idToken = await getAuthToken();
        return await checkFalseGroceryList(idToken, request);
    },
);

export const fetchCheckTrueShareGroceryList = createAsyncThunk(
    `/api/groceriesLists/updateShare/true`,
    async (request: RequestCheckShareGroceryList) => {
        return await checkTrueShareGroceryList(request);
    },
);

export const fetchCheckFalseShareGroceryList = createAsyncThunk(
    `/api/groceriesLists/updateShare/false`,
    async (request: RequestCheckShareGroceryList) => {
        return await checkFalseShareGroceryList(request);
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
