import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import SearchBar from '../../components/SearchBar';
import ListComponent, { Element } from '../../components/List';
import { Ingredient } from '../../slice/ingredients/ingredientsFetch';
import { ingredients, fetchDeleteIngredient } from '../../slice/ingredients/ingredientsSlice';
import { useSelector, useDispatch } from 'react-redux';

const MyIngredients = (): JSX.Element => {
    const ingredientsList = useSelector(ingredients);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const selectIngredientsCustom = (ingredientsElements: Ingredient[]): Ingredient[] =>
        ingredientsElements.filter((ingredient) => {
            return ingredient.user_id !== null;
        });

    const deleteIngredient = (ingredient: Element) => {
        dispatch(fetchDeleteIngredient(ingredient.id));
    };

    const [ingredientsDisplay, setIngredientsDisplay] = useState(ingredientsList);

    const onChange = (ids: string[]) => {
        const newIngredients: Ingredient[] = ingredientsList.filter((ingredient) => {
            let resultat = false;
            for (let i = 0; i < ids.length; i++) {
                if (!ingredient.id) {
                    // @DEBUG: remove this
                    console.warn('ingredient with id undefined', ingredient);
                    continue;
                }
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
                onRemoveElement={deleteIngredient}
            />
        </Container>
    );
};

export default MyIngredients;
