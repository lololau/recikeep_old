import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addGroceryList, GroceryList, RequestAddGroceryList } from './groceriesListsFetch';

export const fetchAddGroceryList = createAsyncThunk(
    '/api/groceriesLists/add',
    async (ingredientsList: RequestAddGroceryList, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const groceryList = await addGroceryList(state.user.idToken, ingredientsList);
        console.log(groceryList);
        return groceryList;
    },
);

type Grocery = {
    groceriesLists: GroceryList[];
};

const initialState: Grocery = {
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
    },
});

export const groceryList = (state: RootState): GroceryList[] => state.groceriesLists.groceriesLists;

export default groceriesListsReducer.reducer;
