import '../../i18n';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Modal from '@material-ui/core/Modal';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar from '../../components/SearchBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { fetchDeleteRecipe, selectRecipes } from '../../slice/recipes/recipesSlice';
import { fetchGetARecipe } from '../../slice/recipe/recipeSlice';
import { Recipe } from '../../slice/recipes/recipesFetch';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';

export type RecipesListProps = {
    recipes: Recipe[];
};

export const RecipesList = (props: RecipesListProps): JSX.Element => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();

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
                <h2>{t('modal.delete-recipe')}</h2>
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
                {props.recipes.map((recipe, index) => {
                    return (
                        <ListItem divider={true} key={'RecipesList' + index}>
                            <Link to={'/recipe/' + recipe.id} style={{ textDecoration: 'none', color: 'black' }}>
                                <ListItemText
                                    onClick={() => dispatch(fetchGetARecipe(recipe.id))}
                                    primary={recipe.name}
                                    id={index.toString()}
                                />
                            </Link>
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => {
                                        history.push(`/recipes/update/${recipe.id}`);
                                        console.log(recipe);
                                    }}
                                >
                                    <EditIcon style={{ fontSize: 15 }} color="primary" />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleModalOpen(recipe.id)}>
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

const HomeRecipes = (): JSX.Element => {
    const recipes = useSelector(selectRecipes);
    const { t } = useTranslation();

    const [recipesDisplay, setRecipesDisplay] = useState(recipes);

    const onChange = (ids: string[]) => {
        const newRecipes: Recipe[] = recipes.filter((recipe) => {
            let resultat = false;
            for (let i = 0; i < ids.length; i++) {
                if (recipe.id.toString() === ids[i]) {
                    resultat = true;
                }
            }
            return resultat;
        });
        setRecipesDisplay(newRecipes);
    };

    return (
        <Container>
            <div className="recipes" style={{ marginBottom: 20 }}>
                <h1 style={{ marginBottom: 20 }}>{t('recipes.title')}</h1>
                <Grid container spacing={1} style={{ alignItems: 'center' }}>
                    <Grid item xs={6} sm={6}>
                        <SearchBar elements={recipes} onchange={onChange} width="100%" />
                    </Grid>
                    <Grid item xs={6} sm={6} style={{ textAlign: 'center' }}>
                        <Link to="/recipes/selection" style={{ textDecoration: 'none' }}>
                            <Button color="primary">{t('recipes.selectRecipes')}</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <div className="RecipesList" style={{ marginBottom: 20 }}>
                <RecipesList recipes={recipesDisplay} />
            </div>
            <Box style={{ textAlign: 'center', width: '100%' }}>
                <IconButton>
                    <Link to="/recipes/new_recipe" style={{ color: '#9ebdd8' }}>
                        <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                    </Link>
                </IconButton>
            </Box>
        </Container>
    );
};

export default HomeRecipes;
