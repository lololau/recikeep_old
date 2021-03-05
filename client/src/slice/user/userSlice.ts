import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GetUser, CreateUser, RequestCreateUser, UpdateUser, RequestUpdateUser } from './userFetch';

export interface User {
    id: number;
    isLoading: boolean;
    firebaseId: string;
    fullName: string;
    idToken: string;
    email: string;
    image_profile?: Blob;
}

const initialState: User = {
    id: 0,
    firebaseId: '',
    fullName: '',
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

export const fetchUpdateUser = createAsyncThunk('/api/user/updateUser', async (req: RequestUpdateUser, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userUpdated = await UpdateUser(state.user.idToken, req);
    return userUpdated;
});

const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateIdToken: (state, action) => {
            state.idToken = action.payload;
        },
        updateFirebaseUser: (state, action) => {
            state.firebaseId = action.payload.firebaseId;
            state.email = action.payload.email;
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
            state.fullName = action.payload.full_name;
        });
        builder.addCase(fetchGetUser.rejected, (state) => {
            state.isLoading = false;
            state.fullName = '';
        });

        // fetchCreateUser
        builder.addCase(fetchCreateUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.fullName = action.payload.user.full_name;
        });
        builder.addCase(fetchCreateUser.rejected, (state) => {
            state.isLoading = false;
            state.fullName = '';
        });

        // fetchUpdateUser
        builder.addCase(fetchUpdateUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.fullName = action.payload.user.full_name;
        });
        builder.addCase(fetchUpdateUser.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const { updateIdToken, updateFirebaseUser } = userReducer.actions;

export const selectUser = (state: RootState): User => state.user;
export const isLogged = (state: RootState): boolean => state.user.firebaseId !== '';
export const isCreated = (state: RootState): boolean => state.user.fullName !== '';
export const token = (state: RootState): string => state.user.idToken;

export default userReducer.reducer;