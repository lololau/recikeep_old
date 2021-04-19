import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetShareGroceryList, selectGroceryList } from '../../slice/groceryList/groceryListSlice';
import { IngredientsGroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
import {
    fetchCheckTrueShareGroceryList,
    fetchCheckFalseShareGroceryList,
} from '../../slice/groceriesLists/groceriesListsSlice';
import { useTranslation } from 'react-i18next';

type IngredientListProps = {
    ingredients: IngredientsGroceryList[];
    groceryListShareUid: string;
};

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

const GroceryListShare = (props: GroceryListShareProps): JSX.Element => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const groceryList = useSelector(selectGroceryList);
    console.log('groceryList: ', groceryList);
    console.log('share_uid: ', props.uid);
    console.log('props', props);

    useEffect(() => {
        console.log('vagin', props.uid);
        const timer = setInterval(() => {
            console.log('props.uid', props.uid);
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
