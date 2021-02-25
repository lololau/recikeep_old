import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import firebase from 'firebase/app';

export interface User {
    id: number;
    firebaseId: string;
    idToken: string;
    username: string;
    email: string;
    image_profile?: Blob;
}

const initialState: User = {
    id: 0,
    firebaseId: '',
    idToken: '',
    username: 'laulau',
    email: 'verhille.lauriane@gmail.com',
};

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
    },
});

export const { updateFirebaseId, updateIdToken } = userReducer.actions;

export const selectUser = (state: RootState): User => state.user;
export const isLogged = (state: RootState): boolean => state.user.firebaseId !== '';
export const token = (state: RootState): string => state.user.idToken;

export default userReducer.reducer;
