// Dependencies
import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18n';
// Slice - Store
import { RootState } from '../../app/store';
import { updateARecipe } from '../recipe/recipeSlice';
import { deleteRecipe } from '../recipes/recipesSlice';
import { deleteIngredient } from '../ingredients/ingredientsSlice';
import { deleteUnity } from '../unity/unitySlice';

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
        // action - update notification
        updateNotification: (state, action) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.id++;
        },
    },
    extraReducers: (builder) => {
        // updateARecipe - fulfilled
        builder.addCase(updateARecipe.fulfilled, (state) => {
            state.severity = 'success';
            state.message = 'Recipe updated!';
            state.id++;
        });
        // deleteIngredient - rejected
        builder.addCase(deleteIngredient.rejected, (state) => {
            state.severity = 'error';
            state.message = i18n.t('myIngredients.delete-impossible');
            state.id++;
        });
        // deleteUnity - rejected
        builder.addCase(deleteUnity.rejected, (state) => {
            state.severity = 'error';
            state.message = i18n.t('myUnities.delete-impossible');
            state.id++;
        });
        // deleteRecipe - rejected
        builder.addCase(deleteRecipe.rejected, (state) => {
            state.severity = 'error';
            state.message = i18n.t('recipes.delete-impossible');
            state.id++;
        });
    },
});

export const { updateNotification } = notificationReducer.actions;

export const selectNotification = (state: RootState): Notification => state.notification;

export default notificationReducer.reducer;
