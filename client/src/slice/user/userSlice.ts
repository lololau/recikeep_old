// Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Authentication
import { getAuthToken } from '../../app/auth';
// Feth - Store
import { RootState } from '../../app/store';
import { fetchGetUser, fetchCreateUser, RequestCreateUser, fetchUpdateUser, RequestUpdateUser } from './userFetch';

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

// Thunk - get a user
export const getUser = createAsyncThunk('/api/user/getUser', async () => {
    const idToken = await getAuthToken();
    const user = await fetchGetUser(idToken);
    return user;
});

// Thunk - create a user
export const createUser = createAsyncThunk('/api/user/createUser', async (req: RequestCreateUser) => {
    const idToken = await getAuthToken();
    const user = await fetchCreateUser(idToken, req);
    return user;
});

// Thunk - update a user
export const updateUser = createAsyncThunk('/api/user/updateUser', async (req: RequestUpdateUser) => {
    const idToken = await getAuthToken();
    const userUpdated = await fetchUpdateUser(idToken, req);
    return userUpdated;
});

const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // action - update firebase user
        updateFirebaseUser: (state, action) => {
            state.firebaseId = action.payload.firebaseId;
            state.email = action.payload.email;
        },
        // action - loading started
        loadingStarted: (state) => {
            state.isLoading++;
        },
        // action - loading finished
        loadingFinished: (state) => {
            state.isLoading--;
        },
    },
    extraReducers: (builder) => {
        // getUser - fulfilled
        builder.addCase(getUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.fullName = action.payload.full_name;
        });
        // getUser - rejected
        builder.addCase(getUser.rejected, (state) => {
            state.fullName = '';
        });

        // createUser - fulfilled
        builder.addCase(createUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.fullName = action.payload.user.full_name;
        });
        // createUser - rejected
        builder.addCase(createUser.rejected, (state) => {
            state.fullName = '';
        });

        // updateUser - fulfilled
        builder.addCase(updateUser.fulfilled, (state, action) => {
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
