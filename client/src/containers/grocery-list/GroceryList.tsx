import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGetAGroceryList, selectGroceryList } from '../../slice/groceryList/groceryListSlice';
import { IngredientsGroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
import { fetchCheckTrueGroceryList, fetchCheckFalseGroceryList } from '../../slice/groceriesLists/groceriesListsSlice';

type IngredientListProps = {
    ingredients: IngredientsGroceryList[];
    groceryId: number;
};

const CheckIngredientsList = (props: IngredientListProps) => {
    const dispatch = useDispatch();

    const handleCheck = (ingredient: IngredientsGroceryList) => () => {
        if (!ingredient.checked) {
            dispatch(fetchCheckTrueGroceryList({ groceryListId: props.groceryId, ingredient: ingredient }));
            return;
        }
        dispatch(fetchCheckFalseGroceryList({ groceryListId: props.groceryId, ingredient: ingredient }));
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

interface Params {
    id: string;
}

const GroceryList = (): JSX.Element => {
    const dispatch = useDispatch();

    const { id } = useParams<Params>();
    const groceryList = useSelector(selectGroceryList);
    console.log('groceryList: ', groceryList);

    useEffect(() => {
        dispatch(fetchGetAGroceryList(Number(id)));
    }, []);

    return (
        <Container>
            <h1>{groceryList.name}</h1>
            <CheckIngredientsList groceryId={groceryList.id} ingredients={groceryList.ingredients} />
        </Container>
    );
};

export default GroceryList;
