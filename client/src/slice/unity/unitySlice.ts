// Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Authentication
import { getAuthToken } from '../../app/auth';
// Fetch - Store
import { RootState } from '../../app/store';
import { Unity, fetchGetAllUnities, fetchAddUnity, fetchDeleteUnity, RequestAddUnity } from './unityFetch';

// Thunk - get all unities
export const getAllUnities = createAsyncThunk('/api/unities/getAll', async () => {
    const idToken = await getAuthToken();
    const unities = await fetchGetAllUnities(idToken);
    return unities;
});

// Thunk - add a unity
export const addUnity = createAsyncThunk('/api/unities/add', async (request: RequestAddUnity) => {
    const idToken = await getAuthToken();
    const unity = await fetchAddUnity(idToken, request);
    return unity;
});

// Thunk - delete a unity
export const deleteUnity = createAsyncThunk('/api/unities/delete', async (unityId: number) => {
    const idToken = await getAuthToken();
    await fetchDeleteUnity(idToken, unityId);
    return unityId;
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
        // getAllUnities - fulfilled
        builder.addCase(getAllUnities.fulfilled, (state, action) => {
            state.unities = action.payload;
        });
        // getAllUnities - rejected
        builder.addCase(getAllUnities.rejected, (state) => {
            state.unities = [];
        });
        // addUnity - fulfilled
        builder.addCase(addUnity.fulfilled, (state, action) => {
            state.unities.push(action.payload);
        });
        // deleteUnity - fulfilled
        builder.addCase(deleteUnity.fulfilled, (state, action) => {
            state.unities = state.unities.filter((unity) => unity.id !== action.payload);
        });
    },
});

export const unities = (state: RootState): Unity[] => state.unities.unities;
export default unitiesReducer.reducer;
