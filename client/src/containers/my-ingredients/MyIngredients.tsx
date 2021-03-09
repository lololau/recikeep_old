import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, TextField } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import SearchBar from '../../components/SearchBar';
import ListComponent, { Element } from '../../components/List';
import { Ingredient } from '../../slice/ingredients/ingredientsFetch';
import { ingredients, fetchDeleteIngredient } from '../../slice/ingredients/ingredientsSlice';
import { useSelector, useDispatch } from 'react-redux';

const MyIngredients = (): JSX.Element => {
    const ingredientsList = useSelector(ingredients);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);

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
            <SearchBar elements={ingredientsList} onchange={onChange} width={'50%'} />
            <ListComponent
                listElements={selectIngredientsCustom(ingredientsDisplay)}
                onRemoveElement={deleteIngredient}
            />
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
