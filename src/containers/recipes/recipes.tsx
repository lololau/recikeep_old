import '../../i18n';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ToolsBar from '../toolsbar/toolsbar';
import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import InputBase from '@material-ui/core/InputBase';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

type recipe = {
    title: string;
};

type recipes = recipe[];

export type RecipesListProps = {
    recipes: recipe[];
};

export const myRecipes: recipes = [{ title: 'Pates Carbonara' }, { title: 'Poulet cury' }];

export const TypeComboBox = (): JSX.Element => {
    const { t } = useTranslation();

    const typeList = [
        { type: t('types.appetizer') },
        { type: t('types.starter') },
        { type: t('types.lunch') },
        { type: t('types.dinner') },
        { type: t('types.dessert') },
        { type: t('types.sides') },
    ];

    return (
        <Autocomplete
            id="combo-box-demo"
            options={typeList}
            getOptionLabel={(option) => option.type}
            style={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label={t('recipe.type')} variant="outlined" />}
        />
    );
};

export const TagsComboBox = (): JSX.Element => {
    const { t } = useTranslation();

    const tagList = [
        { tag: t('tags.vegetables') },
        { tag: t('tags.meat') },
        { tag: t('tags.fish') },
        { tag: t('tags.fruits') },
    ];

    return (
        <Autocomplete
            multiple
            id="tags-standard"
            options={tagList}
            getOptionLabel={(option) => option.tag}
            style={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label={t('recipe.tag')} variant="standard" />}
        />
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

const RecipesList: FunctionComponent<RecipesListProps> = (props) => {
    return (
        <List style={{ width: 300 }}>
            {props.recipes.map((recipe, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <Link to={'/recipe/' + index}>
                            <ListItemText primary={recipe.title} id={index.toString()} />
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

const HomeRecipes = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="recipes">
            <h1>{t('recipes.title')}</h1>
            <IconButton>
                <AddCircleOutlineOutlinedIcon color="primary" />
            </IconButton>
            <InputBase placeholder={t('recipe.searchBar')} />
            <TagsComboBox />
            <TypeComboBox />
            <Link to="/recipes/selection_part/1">
                <Button color="primary">{t('recipes.selectRecipes')}</Button>
            </Link>

            <div className="RecipesList">
                <RecipesList recipes={myRecipes} />
            </div>

            <ToolsBar />
        </div>
    );
};

export default HomeRecipes;
