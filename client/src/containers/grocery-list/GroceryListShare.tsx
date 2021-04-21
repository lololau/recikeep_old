// Dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// Slice
import { fetchGetShareGroceryList, selectGroceryList } from '../../slice/groceryList/groceryListSlice';
import { IngredientsGroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
import {
    fetchCheckTrueShareGroceryList,
    fetchCheckFalseShareGroceryList,
} from '../../slice/groceriesLists/groceriesListsSlice';
// Material-ui
import { Container, List, ListItemIcon, ListItem, Checkbox, ListItemText } from '@material-ui/core';

type IngredientListProps = {
    ingredients: IngredientsGroceryList[];
    groceryListShareUid: string;
};

// CheckIngredientsList component
//
// It is possible to :
// - Check / Uncheck an ingredient by verified if its ingredient.checked property
const CheckIngredientsList = (props: IngredientListProps) => {
    const dispatch = useDispatch();

    const handleCheck = (ingredient: IngredientsGroceryList) => () => {
        if (!ingredient.checked) {
            dispatch(
                fetchCheckTrueShareGroceryList({
                    groceryListShareUid: props.groceryListShareUid,
                    ingredient: ingredient,
                }),
            );
            return;
        }
        dispatch(
            fetchCheckFalseShareGroceryList({ groceryListShareUid: props.groceryListShareUid, ingredient: ingredient }),
        );
    };

    return (
        <List>
            {props.ingredients.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={'CheckIngredientsList' + index} onClick={handleCheck(ingredient)}>
                        <ListItemIcon>
                            <Checkbox edge="start" checked={!!ingredient.checked} tabIndex={-1} disableRipple />
                        </ListItemIcon>
                        <ListItemText
                            primary={ingredient.ingredient}
                            secondary={ingredient.quantity + ' ' + ingredient.unity}
                            id={index.toString()}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

interface GroceryListShareProps {
    uid: string;
}

// GroceryListShare component
//
// It is possible to :
// - See all ingredients in the grocery list with <CheckIngredientsList /> component

const GroceryListShare = (props: GroceryListShareProps): JSX.Element => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const groceryList = useSelector(selectGroceryList);

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(fetchGetShareGroceryList(props.uid));
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Container>
            <h1>{groceryList.name}</h1>
            <CheckIngredientsList groceryListShareUid={props.uid} ingredients={groceryList.ingredients} />
            <List style={{ marginTop: '30px' }}>
                <h4>{t('groceryList.recipes-selected')}</h4>
                {groceryList.recipes.map((recipe, index) => {
                    return (
                        <ListItem divider={true} key={'RecipesSelected' + index}>
                            <ListItemText primary={recipe.name} secondary={recipe.presentation} id={index.toString()} />
                        </ListItem>
                    );
                })}
            </List>
        </Container>
    );
};

export default GroceryListShare;
