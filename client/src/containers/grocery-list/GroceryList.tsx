import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { groceryList } from '../../slice/groceryList/groceryListSlice';
import { IngredientsRecipe } from '../../slice/groceryList/groceryListFetch';

type IngredientListProps = {
    ingredients: IngredientsRecipe[];
};

const CheckIngredientsList: FC<IngredientListProps> = (props) => {
    return (
        <List>
            {props.ingredients.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={'CheckIngredientsList' + index}>
                        <ListItemIcon>
                            <Checkbox edge="start" checked={false} tabIndex={-1} disableRipple />
                        </ListItemIcon>
                        <ListItemText
                            primary={ingredient.ingredient}
                            secondary={ingredient.unity + ' ' + ingredient.quantity}
                            id={index.toString()}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

const GroceryList = (): JSX.Element => {
    const { t } = useTranslation();

    const ingredientsList = useSelector(groceryList);

    return (
        <Container>
            <h1>{t('groceryList.title-page')}</h1>
            <CheckIngredientsList ingredients={ingredientsList} />
            <Box>
                <IconButton>
                    <Grid container direction="column" alignItems="center" spacing={1}>
                        <Link to="/groceryList">
                            <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                        </Link>
                    </Grid>
                </IconButton>
            </Box>
        </Container>
    );
};

export default GroceryList;
