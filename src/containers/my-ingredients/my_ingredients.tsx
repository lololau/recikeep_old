import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, IconButton, TextField } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

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
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <Container>
            <Grid container style={{ alignItems: 'center' }}>
                <Grid item xs={6}>
                    <h1>{t('myIngredients.title-page')}</h1>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right', alignItems: 'center' }}>
                    <IconButton onClick={() => setModalOpen(true)}>
                        <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
            </Grid>
            <IngredientsList ingredients={myIngredients} />

            <Dialog open={modalOpen} style={{}}>
                <Container>
                    <DialogTitle>
                        <h3>{t('myIngredients.add-ingredient')}</h3>
                    </DialogTitle>
                    <DialogContent>
                        <DialogActions>
                            <Grid container spacing={4} style={{ flexDirection: 'column' }}>
                                <Grid item xs>
                                    <Grid container spacing={6} style={{ alignItems: 'center' }}>
                                        <Grid item xs={6}>
                                            <TextField placeholder={t('myIngredients.textField')} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button>{t('myIngredients.modal-add')}</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => setModalOpen(false)}>
                                        {t('myIngredients.modal-close')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </DialogContent>
                </Container>
            </Dialog>
        </Container>
    );
};

export default MyIngredients;
