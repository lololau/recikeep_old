import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthToken } from '../../app/auth';
import { RootState } from '../../app/store';
import { Unity, getUnities, addUnity, deleteUnity, RequestAddUnity } from './unityFetch';

// Get all unities from initial state and by user
export const fetchGetUnities = createAsyncThunk('/api/unities/getAll', async () => {
    const idToken = await getAuthToken();
    const unities = await getUnities(idToken);
    return unities;
});

export const fetchAddUnity = createAsyncThunk('/api/unities/add', async (request: RequestAddUnity) => {
    const idToken = await getAuthToken();
    const unity = await addUnity(idToken, request);
    return unity;
});

export const fetchDeleteUnity = createAsyncThunk('/api/unities/delete', async (unityId: number) => {
    const idToken = await getAuthToken();
    await deleteUnity(idToken, unityId);
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
        // fetchDeleteUnity
        builder.addCase(fetchDeleteUnity.fulfilled, (state, action) => {
            state.unities = state.unities.filter((unity) => unity.id !== action.payload);
        });
    },
});

export const unities = (state: RootState): Unity[] => state.unities.unities;
export default unitiesReducer.reducer;
