import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface Group {
    id: number;
    name: string;
    date_creation: Date;
    date_update: Date;
}

type GroupsList = {
    groups: Group[];
};

const initialState: GroupsList = {
    groups: [
        { name: 'Famille Verhille', id: 0, date_creation: new Date(2021, 2, 10), date_update: new Date(2021, 2, 10) },
        { name: 'Beeboo', id: 1, date_creation: new Date(2021, 2, 10), date_update: new Date(2021, 2, 10) },
        { name: 'Baguera Pot', id: 2, date_creation: new Date(2021, 2, 10), date_update: new Date(2021, 2, 10) },
    ],
};

const groupReducer = createSlice({
    name: 'groups',
    initialState: initialState,
    reducers: {},
});

export const selectGroups = (state: RootState): Group[] => state.groups.groups;

export default groupReducer.reducer;
