import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IngredientsRecipe } from './groceryListFetch';

type GroceryList = {
    groceryList: IngredientsRecipe[];
};

const prout: IngredientsRecipe[] = [{ ingredient: 'Poireau', unity: 'unit', quantity: 3 }];

const initialState: GroceryList = {
    groceryList: prout,
};

const groceryListReducer = createSlice({
    name: 'groceryList',
    initialState: initialState,
    reducers: {},
    //extraReducers: (builder) => {},
});

export const groceryList = (state: RootState): IngredientsRecipe[] => state.groceryList.groceryList;

export default groceryListReducer.reducer;
