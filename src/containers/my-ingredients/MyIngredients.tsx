import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, TextField } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import SearchBar, { filterSearchBar } from '../../components/SearchBar';
import ListComponent from '../../components/List';

type ingredient = {
    name: string;
    id: string;
};
type ingredients = ingredient[];

const myIngredients: ingredients = [
    { name: 'Patate', id: '0' },
    { name: 'Ananas', id: '1' },
    { name: 'Banane', id: '2' },
];

const MyIngredients = (): JSX.Element => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const [ingredientsDisplay, setIngredientsDisplay] = useState(myIngredients);

    const onChange = (ids: string[]) => {
        const ingredients = filterSearchBar(myIngredients, ids);
        setIngredientsDisplay(ingredients);
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
            <SearchBar elements={myIngredients} onchange={onChange} width={'50%'} />
            <ListComponent listElements={ingredientsDisplay} />
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
