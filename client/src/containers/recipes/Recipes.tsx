import '../../i18n';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar from '../../components/SearchBar';
import TagBox from '../../components/Tags';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { selectRecipes } from '../../slice/recipes/recipesSlice';
import { fetchGetARecipe } from '../../slice/recipe/recipeSlice';
import { Recipe } from '../../slice/recipes/recipesFetch';
import { useSelector, useDispatch } from 'react-redux';

export type RecipesListProps = {
    recipes: Recipe[];
};

export const RecipesList = (props: RecipesListProps): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <List>
            {props.recipes.map((recipe, index) => {
                return (
                    <ListItem divider={true} key={'RecipesList' + index}>
                        <Link to={'/recipe/' + recipe.id}>
                            <ListItemText
                                onClick={() => dispatch(fetchGetARecipe(recipe.id))}
                                primary={recipe.name}
                                id={index.toString()}
                            />
                        </Link>
                        <ListItemSecondaryAction>
                            <IconButton>
                                <FavoriteIcon style={{ fontSize: 15 }} color="primary" />
                            </IconButton>
                            <IconButton>
                                <EditIcon style={{ fontSize: 15 }} color="primary" />
                            </IconButton>
                            <IconButton>
                                <PresentToAllIcon style={{ fontSize: 15 }} color="primary" />
                            </IconButton>
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
            <div className="recipes">
                <h1>{t('recipes.title')}</h1>
                <br />
                <SearchBar elements={recipes} onchange={onChange} width="33%" />
                <br />
                <br />
                <Box>
                    <Grid container spacing={3} style={{ alignItems: 'center' }}>
                        <Grid item xs={6}>
                            <TagBox />
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/recipes/selection">
                                <Button color="primary">{t('recipes.selectRecipes')}</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <br />
            <br />
            <div className="RecipesList">
                <RecipesList recipes={recipesDisplay} />
            </div>
            <br />
            <IconButton>
                <Link to="/recipes/new_recipe">
                    <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                </Link>
            </IconButton>
        </Container>
    );
};

export default HomeRecipes;
