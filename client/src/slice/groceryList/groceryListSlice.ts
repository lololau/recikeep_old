import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getGroceryList, GroceryListInformation } from './groceryListFetch';

export const fetchGetAGroceryList = createAsyncThunk(
    `/api/groceriesLists/:id`,
    async (groceryListId: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const groceryList = await getGroceryList(state.user.idToken, groceryListId);
        return groceryList;
    },
);

type GroceryList = {
    groceryList: GroceryListInformation;
};

const initialState: GroceryList = {
    groceryList: {
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
    },
});

export const selectGroceryList = (state: RootState): GroceryListInformation => state.groceryList.groceryList;

export default groceryListReducer.reducer;
