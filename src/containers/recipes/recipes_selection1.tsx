import { RecipesListProps, TagsComboBox, TypeComboBox, myRecipes } from './recipes';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import React from 'react';

const SelectionRecipesList: FC<RecipesListProps> = (props) => {
    return (
        <List>
            {props.recipes.map((recipe, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemIcon>
                            <Checkbox edge="start" checked={false} tabIndex={-1} disableRipple />
                        </ListItemIcon>
                        <ListItemText primary={recipe.title} id={index.toString()} />
                    </ListItem>
                );
            })}
        </List>
    );
};

const SelectionRecipes = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="recipes">
            <h1>{t('recipes.title')}</h1>

            <InputBase placeholder={t('recipe.searchBar')} />
            <TagsComboBox />
            <TypeComboBox />

            <div className="SelectionRecipesList">
                <SelectionRecipesList recipes={myRecipes} />
            </div>
            <IconButton>
                <Link to="/recipes/selection_part/2">
                    <NavigateNextIcon />
                </Link>
            </IconButton>
        </div>
    );
};

export default SelectionRecipes;
