import React from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Grid from '@material-ui/core/Grid';

type IngredientsProps = {
    ingredients: ingredient[];
};
type ingredient = {
    name: string;
};
type ingredients = ingredient[];

const myIngredients: ingredients = [{ name: 'Patate' }, { name: 'Ananas' }, { name: 'Banane' }];

const IngredientsList = (props: IngredientsProps): JSX.Element => {
    return (
        <List>
            {props.ingredients.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemText primary={ingredient.name} id={index.toString()} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <DeleteIcon style={{ fontSize: 15 }} color="primary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

const MyIngredients = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Container>
            <h1>{t('myIngredients.title-page')}</h1>
            <IngredientsList ingredients={myIngredients} />
            <IconButton style={{ width: '100%' }}>
                <Grid container direction="column" alignItems="center" spacing={1}>
                    <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                    <p style={{ fontSize: 11 }}>{t('myIngredients.add-ingredient')}</p>
                </Grid>
            </IconButton>
        </Container>
    );
};

export default MyIngredients;
