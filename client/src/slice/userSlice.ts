import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface User {
    id: number;
    firebaseId: string;
    firstName: string;
    lastName?: string;
    idToken: string;
    username: string;
    email: string;
    image_profile?: Blob;
}

const initialState: User = {
    id: 0,
    firebaseId: '',
    firstName: '',
    idToken: '',
    username: 'laulau',
    email: 'verhille.lauriane@gmail.com',
};

const fetchUserById = createAsyncThunk('/api/user/getUser', async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId);
    return response.data;
});

const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateFirebaseId: (state, action) => {
            state.firebaseId = action.payload;
        },
        updateIdToken: (state, action) => {
            state.idToken = action.payload;
        },
        updateFirstName: (state, action) => {
            state.firstName = action.payload;
        },
    },
});

export const { updateFirebaseId, updateIdToken, updateFirstName } = userReducer.actions;

export const selectUser = (state: RootState): User => state.user;
export const isLogged = (state: RootState): boolean => state.user.firebaseId !== '';
export const isCreated = (state: RootState): boolean => state.user.firstName !== '';
export const token = (state: RootState): string => state.user.idToken;

export default userReducer.reducer;
