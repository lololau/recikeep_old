import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Unity, getUnities } from './unityFetch';

// Get all unities from initial state and by user
export const fetchGetUnities = createAsyncThunk('/api/unities/getAll', async (idToken: string) => {
    const unities = await getUnities(idToken);
    return unities;
});

type UnitiesList = {
    unities: Unity[];
};

const initialState: UnitiesList = {
    unities: [],
};

const unitiesReducer = createSlice({
    name: 'unities',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetchGetIngredients
        builder.addCase(fetchGetUnities.fulfilled, (state, action) => {
            state.unities = action.payload;
        });
        builder.addCase(fetchGetUnities.rejected, (state) => {
            state.unities = [];
        });
    },
});

export const unities = (state: RootState): Unity[] => state.unities.unities;

export default unitiesReducer.reducer;
