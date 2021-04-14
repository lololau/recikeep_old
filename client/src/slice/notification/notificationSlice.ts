import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUpdateRecipe } from '../recipe/recipeSlice';
import { fetchDeleteIngredient } from '../ingredients/ingredientsSlice';
import { fetchDeleteUnity } from '../unity/unitySlice';
import i18n from '../../i18n';

type TypeSeverity = 'success' | 'error' | 'warning' | 'info';

type Notification = {
    message: string;
    severity?: TypeSeverity;
    id: number;
};

const initialState: Notification = {
    message: '',
    id: 0,
};

const notificationReducer = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        updateNotification: (state, action) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.id++;
        },
    },
    extraReducers: (builder) => {
        // fetchUpdateRecipe
        builder.addCase(fetchUpdateRecipe.fulfilled, (state) => {
            state.severity = 'success';
            state.message = 'Recipe updated!';
            state.id++;
        });
        // fetchDeleteIngredient
        builder.addCase(fetchDeleteIngredient.rejected, (state) => {
            state.severity = 'error';
            state.message = i18n.t('myIngredients.delete-impossible');
            state.id++;
        });
        // fetchDeleteUnity
        builder.addCase(fetchDeleteUnity.rejected, (state) => {
            state.severity = 'error';
            state.message = i18n.t('myUnities.delete-impossible');
            state.id++;
        });
    },
});

export const { updateNotification } = notificationReducer.actions;

export const selectNotification = (state: RootState): Notification => state.notification;

export default notificationReducer.reducer;
