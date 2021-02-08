import { RecipesListProps, myRecipes } from '../recipes/Recipes';
import { FC, useState } from 'react';
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
import SearchBar, { filterSearchBar } from '../../components/SearchBar';

const SelectionRecipesList: FC<RecipesListProps> = (props) => {
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
    const [recipesDisplay, setRecipesDisplay] = useState(myRecipes);
    const onChange = (ids: string[]) => {
        const recipes = filterSearchBar(myRecipes, ids);
        setRecipesDisplay(recipes);
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
                    <SearchBar onchange={onChange} elements={myRecipes} width="100%" />
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
