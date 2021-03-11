import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Group {
    id: number;
    name: string;
}

type GroupsList = {
    groups: Group[];
};

const initialState: GroupsList = {
    groups: [
        { name: 'Famille Verhille', id: 0 },
        { name: 'Beeboo', id: 1 },
        { name: 'Baguera Pot', id: 2 },
    ],
};

const groupReducer = createSlice({
    name: 'groups',
    initialState: initialState,
    reducers: {},
});

export const selectGroups = (state: RootState): Group[] => state.groups.groups;

export default groupReducer.reducer;
