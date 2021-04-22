// Dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
// Slice
import { Ingredient } from '../../slice/ingredients/ingredientsFetch';
import { ingredients, deleteIngredient } from '../../slice/ingredients/ingredientsSlice';
// Component
import SearchBar from '../../components/SearchBar';
import ListComponent, { Element } from '../../components/List';
// Material-ui
import { Container, Box } from '@material-ui/core';

// MyIngredients component
//
// Component which contains all ingredients register on the profil account connected
const MyIngredients = (): JSX.Element => {
    const ingredientsList = useSelector(ingredients);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    // Method to select only ingredients register by the user account connected
    const selectIngredientsCustom = (ingredientsElements: Ingredient[]): Ingredient[] =>
        ingredientsElements.filter((ingredient) => {
            return ingredient.user_id !== null;
        });

    // Method to delete a specific ingredient by id
    const removeIngredient = (ingredient: Element) => {
        dispatch(deleteIngredient(ingredient.id));
    };

    const [ingredientsDisplay, setIngredientsDisplay] = useState(ingredientsList);

    const onChange = (ids: string[]) => {
        const newIngredients: Ingredient[] = ingredientsList.filter((ingredient) => {
            let resultat = false;
            for (let i = 0; i < ids.length; i++) {
                if (ingredient.id.toString() === ids[i]) {
                    resultat = true;
                }
            }
            return resultat;
        });
        setIngredientsDisplay(newIngredients);
    };

    return (
        <Container>
            <h1>{t('myIngredients.title-page')}</h1>
            <Box style={{ marginTop: 30, marginBottom: 20 }}>
                <SearchBar elements={ingredientsList} onchange={onChange} width={'100%'} />
            </Box>
            <ListComponent
                listElements={selectIngredientsCustom(ingredientsDisplay)}
                onRemoveElement={removeIngredient}
            />
        </Container>
    );
};

export default MyIngredients;
