// Dependencies
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../i18n';
import { Link } from 'react-router-dom';
// Slice
import { fetchDeleteRecipe, selectGroceriesList } from '../../slice/groceriesLists/groceriesListsSlice';
import { fetchGetAGroceryList } from '../../slice/groceryList/groceryListSlice';
import { GroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
// Component
import SearchBar from '../../components/SearchBar';
// Material-ui
import {
    Button,
    List,
    ListItem,
    Modal,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
    Container,
    Grid,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
export type GroceryListProps = {
    groceries: GroceryList[];
};

// GroceriesList component
// Component which contains all grocery list register on the profil account connected.
//
// It is possible to :
// - See the grocery list by clicking on the date which is the grocery list name;
// - Delete the grocery list by clicking on the trush icon. (onClick : display a modal to confirm the deletion)

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

// Groceries component
//
// It is possible to :
// - Search a specific grocery list by name
// - Start a new grocery list by clicking on button 'new grocery list'
// - See all groceries lists with <GroceriesList /> component

const Groceries = (): JSX.Element => {
    const groceriesList = useSelector(selectGroceriesList);
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
                <h1 style={{ marginBottom: 20 }}>{t('groceries.title-page')}</h1>
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
