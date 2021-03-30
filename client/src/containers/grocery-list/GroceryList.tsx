import React, { FC, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGetAGroceryList, selectGroceryList } from '../../slice/groceryList/groceryListSlice';
import { IngredientsGroceryList } from '../../slice/groceriesLists/groceriesListsFetch';

type IngredientListProps = {
    ingredients: IngredientsGroceryList[];
};

const CheckIngredientsList: FC<IngredientListProps> = (props) => {
    const [checked, setChecked] = React.useState([-1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    return (
        <List>
            {props.ingredients.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={'CheckIngredientsList' + index} onClick={handleToggle(index)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(index) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
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
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { id } = useParams<Params>();
    const groceryList = useSelector(selectGroceryList);

    useEffect(() => {
        dispatch(fetchGetAGroceryList(Number(id)));
    }, []);

    return (
        <Container>
            <h1>{t('groceryList.title-page')}</h1>
            <CheckIngredientsList ingredients={groceryList.ingredients} />
        </Container>
    );
};

export default GroceryList;
