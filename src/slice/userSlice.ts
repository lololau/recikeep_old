import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface User {
    id: number;
    firebaseId: string;
    username: string;
    email: string;
    image_profile?: Blob;
}

const initialState: User = {
    id: 0,
    firebaseId: '',
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
    },
});

export const { updateFirebaseId } = userReducer.actions;

export const selectUser = (state: RootState): User => state.user;
export const isLogged = (state: RootState): boolean => state.user.firebaseId !== '';

export default userReducer.reducer;
