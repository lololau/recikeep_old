import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GetUser, CreateUser, RequestCreateUser } from './userFetch';

export interface User {
    id: number;
    isLoading: boolean;
    firebaseId: string;
    firstName: string;
    lastName?: string;
    idToken: string;
    email: string;
    image_profile?: Blob;
}

const initialState: User = {
    id: 0,
    firebaseId: '',
    firstName: '',
    idToken: '',
    email: '',
    isLoading: false,
};

export const fetchGetUser = createAsyncThunk('/api/user/getUser', async (idToken: string) => {
    const user = await GetUser(idToken);
    return user;
});

export const fetchCreateUser = createAsyncThunk('/api/user/createUser', async (req: RequestCreateUser, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const user = await CreateUser(state.user.idToken, req);
    return user;
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
    extraReducers: (builder) => {
        // fetchGetUser
        builder.addCase(fetchGetUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchGetUser.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.firstName = action.payload.first_name;
        });
        builder.addCase(fetchGetUser.rejected, (state) => {
            state.isLoading = false;
            state.firstName = '';
        });

        // fetchCreateUser
        builder.addCase(fetchCreateUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.firstName = action.payload.user.first_name;
        });
        builder.addCase(fetchCreateUser.rejected, (state) => {
            state.isLoading = false;
            state.firstName = '';
        });
    },
});

export const { updateFirebaseId, updateIdToken, updateFirstName } = userReducer.actions;

export const selectUser = (state: RootState): User => state.user;
export const isLogged = (state: RootState): boolean => state.user.firebaseId !== '';
export const isCreated = (state: RootState): boolean => state.user.firstName !== '';
export const token = (state: RootState): string => state.user.idToken;

export default userReducer.reducer;
