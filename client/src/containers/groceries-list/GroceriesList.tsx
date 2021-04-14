import '../../i18n';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Modal from '@material-ui/core/Modal';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar from '../../components/SearchBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { fetchDeleteRecipe, selectGroceriesList } from '../../slice/groceriesLists/groceriesListsSlice';
import { fetchGetAGroceryList } from '../../slice/groceryList/groceryListSlice';
import { GroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
import { useSelector, useDispatch } from 'react-redux';

export type GroceryListProps = {
    groceries: GroceryList[];
};

export const GroceriesList = (props: GroceryListProps): JSX.Element => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [modalOpen, setModalOpen] = useState(false);
    const [toDeleteId, setToDeleteId] = useState(0);

    const handleModalOpen = (id: number) => {
        setToDeleteId(id);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const bodyModal = (
        <Grid
            container
            spacing={4}
            style={{
                marginTop: '25%',
                maxWidth: 350,
                marginRight: 'auto',
                marginLeft: 'auto',
                flexDirection: 'column',
                backgroundColor: 'white',
                alignItems: 'center',
            }}
        >
            <Grid item xs>
                <h2>{t('modal.delete-grocery')}</h2>
                <p>{t('modal.delete-definitif')}</p>
            </Grid>
            <Grid item xs>
                <Grid container spacing={4} style={{}}>
                    <Grid item xs={6}>
                        <Button
                            onClick={() => {
                                dispatch(fetchDeleteRecipe(toDeleteId));
                                handleClose();
                            }}
                        >
                            {t('modal.delete-yes')}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleClose}>{t('modal.delete-no')}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <>
            <List>
                {props.groceries.map((grocery, index) => {
                    return (
                        <ListItem divider={true} key={'GroceriesList' + index}>
                            <Link to={'/groceryList/' + grocery.id} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItemText
                                    onClick={() => dispatch(fetchGetAGroceryList(grocery.id))}
                                    primary={t('groceries.name-beginning') + grocery.name}
                                    id={index.toString()}
                                />
                            </Link>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => handleModalOpen(grocery.id)}>
                                    <DeleteIcon style={{ fontSize: 15 }} color="primary" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodyModal}
            </Modal>
        </>
    );
};

// Component which contains all recipes register on the profil account connected.
//
// It is possible to :
// - See the recipe by clicking on the title;
// - Add as favorite recipe by clicking on the heart icon;
// - Edit by clicking on the pen icon;
// - Share into a group by clicking on the arrow icon;
// - Delete the recipe by clicking on the trush icon.

const Groceries = (): JSX.Element => {
    const groceriesList = useSelector(selectGroceriesList);
    console.log('groceriesList :', groceriesList);
    const { t } = useTranslation();

    const [groceriesDisplay, setGroceriesDisplay] = useState(groceriesList);

    const onChange = (ids: string[]) => {
        const newGroceriesList: GroceryList[] = groceriesList.filter((recipe) => {
            let resultat = false;
            for (let i = 0; i < ids.length; i++) {
                if (recipe.id.toString() === ids[i]) {
                    resultat = true;
                }
            }
            return resultat;
        });
        setGroceriesDisplay(newGroceriesList);
    };

    return (
        <Container>
            <div className="groceries" style={{ marginBottom: 20 }}>
                <h1 style={{ marginBottom: 20 }}>{t('groceries.title')}</h1>
                <Grid container spacing={1} style={{ alignItems: 'center' }}>
                    <Grid item xs={6} sm={6}>
                        <SearchBar elements={groceriesList} onchange={onChange} width="100%" />
                    </Grid>
                    <Grid item xs={6} sm={6} style={{ textAlign: 'center' }}>
                        <Link to="/recipes/selection" style={{ textDecoration: 'none' }}>
                            <Button color="primary">{t('recipes.selectRecipes')}</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <div style={{ marginBottom: 20 }}>
                <GroceriesList groceries={groceriesDisplay} />
            </div>
        </Container>
    );
};

export default Groceries;
