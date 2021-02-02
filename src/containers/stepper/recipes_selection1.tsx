import { RecipesListProps, TagsComboBox, TypeComboBox, myRecipes } from '../recipes/recipes';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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

    return (
        <Container>
            <h1>{t('stepper.title-selection')}</h1>
            <Grid
                container
                spacing={3}
                style={{
                    textAlign: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid item xs={4}>
                    <InputBase placeholder={t('recipe.searchBar')} />
                </Grid>
                <Grid item xs={4}>
                    <TagsComboBox />
                </Grid>
                <Grid item xs={4}>
                    <TypeComboBox />
                </Grid>
            </Grid>
            <div className="SelectionRecipesList">
                <SelectionRecipesList recipes={myRecipes} />
            </div>
        </Container>
    );
};

export default SelectionRecipes;
