import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAuthToken } from '../../app/auth';
import { GetUser, CreateUser, RequestCreateUser, UpdateUser, RequestUpdateUser } from './userFetch';

export interface User {
    id: number;
    isLoading: number;
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
    isLoading: 0,
};

export const fetchGetUser = createAsyncThunk('/api/user/getUser', async () => {
    const idToken = await getAuthToken();
    const user = await GetUser(idToken);
    return user;
});

export const fetchCreateUser = createAsyncThunk('/api/user/createUser', async (req: RequestCreateUser) => {
    const idToken = await getAuthToken();
    const user = await CreateUser(idToken, req);
    return user;
});

export const fetchUpdateUser = createAsyncThunk('/api/user/updateUser', async (req: RequestUpdateUser) => {
    const idToken = await getAuthToken();
    const userUpdated = await UpdateUser(idToken, req);
    return userUpdated;
});

const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateFirebaseUser: (state, action) => {
            state.firebaseId = action.payload.firebaseId;
            state.email = action.payload.email;
        },
        loadingStarted: (state) => {
            state.isLoading++;
        },
        loadingFinished: (state) => {
            state.isLoading--;
        },
    },
    extraReducers: (builder) => {
        // fetchGetUser
        builder.addCase(fetchGetUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.fullName = action.payload.full_name;
        });
        builder.addCase(fetchGetUser.rejected, (state) => {
            state.fullName = '';
        });

        // fetchCreateUser
        builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.fullName = action.payload.user.full_name;
        });
        builder.addCase(fetchCreateUser.rejected, (state) => {
            state.fullName = '';
        });

        // fetchUpdateUser
        builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.fullName = action.payload.user.full_name;
        });
    },
});

export const { updateFirebaseUser, loadingStarted, loadingFinished } = userReducer.actions;

export const selectUser = (state: RootState): User => state.user;
export const isLogged = (state: RootState): boolean => state.user.firebaseId !== '';
export const isCreated = (state: RootState): boolean => state.user.fullName !== '';
export const token = (state: RootState): string => state.user.idToken;
export const loading = (state: RootState): boolean => state.user.isLoading > 0;

export default userReducer.reducer;
