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

type IngredientListProps = {
    ingredients: ingredient[];
};

type ingredient = {
    name: string;
    unity: string;
    quantity: string;
};

type ingredients = ingredient[];

const myIngredients: ingredients = [
    { name: 'Potatoes', unity: '500', quantity: 'g' },
    { name: 'Chicken', unity: '2', quantity: 'filets' },
    { name: 'Tomatoes', unity: '3', quantity: '' },
];

const CheckIngredientsList: FC<IngredientListProps> = (props) => {
    return (
        <List>
            {props.ingredients.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemIcon>
                            <Checkbox edge="start" checked={false} tabIndex={-1} disableRipple />
                        </ListItemIcon>
                        <ListItemText
                            primary={ingredient.name}
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
    return (
        <Container>
            <h1>{t('groceryList.title-page')}</h1>
            <CheckIngredientsList ingredients={myIngredients} />
            <Box>
                <IconButton style={{ width: '100%' }}>
                    <Grid container direction="column" alignItems="center" spacing={1}>
                        <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                        <p style={{ fontSize: 11 }}>{t('groceryList.add-ingredient')}</p>
                    </Grid>
                </IconButton>
            </Box>
        </Container>
    );
};

export default GroceryList;
