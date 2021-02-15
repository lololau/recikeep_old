import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface User {
    id: number;
    firebaseId: string;
    name: string;
    email: string;
    image_profile?: Blob;
    date_creation: Date;
    date_update: Date;
}

const initialState: User = {
    id: 0,
    firebaseId: '',
    name: 'laulau',
    email: 'verhille.lauriane@gmail.com',
    date_creation: new Date(2021, 2, 10),
    date_update: new Date(2021, 2, 10),
};

const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
});

export const selectUser = (state: RootState): User => state.user;
export const isLogged = (state: RootState): boolean => state.user.firebaseId !== '';

export default userReducer.reducer;
