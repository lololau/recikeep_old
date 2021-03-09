import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Unity, getUnities, addUnity, RequestAddUnity } from './unityFetch';

// Get all unities from initial state and by user
export const fetchGetUnities = createAsyncThunk('/api/unities/getAll', async (idToken: string) => {
    const unities = await getUnities(idToken);
    return unities;
});

export const fetchAddUnity = createAsyncThunk('/api/unities/add', async (request: RequestAddUnity, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const unity = await addUnity(state.user.idToken, request);
    return unity;
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
        // fetchGetUnities
        builder.addCase(fetchGetUnities.fulfilled, (state, action) => {
            state.unities = action.payload;
        });
        builder.addCase(fetchGetUnities.rejected, (state) => {
            state.unities = [];
        });
        // fetchAddUnity
        builder.addCase(fetchAddUnity.fulfilled, (state, action) => {
            state.unities.push(action.payload);
        });
    },
});

export const unities = (state: RootState): Unity[] => state.unities.unities;
export default unitiesReducer.reducer;
