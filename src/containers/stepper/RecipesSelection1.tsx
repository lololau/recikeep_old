import { RecipesListProps } from '../recipes/Recipes';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TagsBox from '../../components/Tags';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../../components/SearchBar';
import { selectRecipes, Recipe } from '../../slice/recipeSlice';
import { useSelector } from 'react-redux';

const SelectionRecipesList = (props: RecipesListProps) => {
    return (
        <List>
            {props.recipes.map((recipe, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemIcon>
                            <Checkbox edge="start" checked={false} tabIndex={-1} disableRipple />
                        </ListItemIcon>
                        <ListItemText primary={recipe.name} id={index.toString()} />
                    </ListItem>
                );
            })}
        </List>
    );
};

const SelectionRecipes = (): JSX.Element => {
    const { t } = useTranslation();
    const recipes = useSelector(selectRecipes);

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
            <h1>{t('stepper.title-selection')}</h1>
            <Grid
                container
                spacing={2}
                style={{
                    textAlign: 'left',
                }}
            >
                <Grid item xs={6}>
                    <SearchBar onchange={onChange} elements={recipes} width="100%" />
                </Grid>
                <Grid item xs={6}>
                    <TagsBox />
                </Grid>
            </Grid>
            <div className="SelectionRecipesList">
                <SelectionRecipesList recipes={recipesDisplay} />
            </div>
        </Container>
    );
};

export default SelectionRecipes;
