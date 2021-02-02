import '../../i18n';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar, { filterSearchBar } from '../../components/search_bar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

type recipe = {
    name: string;
    id: string;
};

type recipes = recipe[];

export type RecipesListProps = {
    recipes: recipe[];
};

export const myRecipes: recipes = [
    { name: 'Pates Carbonara', id: '0' },
    { name: 'Poulet cury', id: '1' },
];

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

export const RecipesList: FC<RecipesListProps> = (props) => {
    return (
        <List>
            {props.recipes.map((recipe, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <Link to={'/recipe/' + index}>
                            <ListItemText primary={recipe.name} id={index.toString()} />
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

    const [recipesDisplay, setRecipesDisplay] = useState(myRecipes);

    const onChange = (ids: string[]) => {
        const recipes = filterSearchBar(myRecipes, ids);
        setRecipesDisplay(recipes);
    };

    return (
        <Container>
            <div className="recipes">
                <h1>{t('recipes.title')}</h1>
                <br />
                <SearchBar elements={myRecipes} onchange={onChange} width="33%" />
                <br />
                <br />
                <Box>
                    <Grid container spacing={3} style={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                            <TagsComboBox />
                        </Grid>
                        <Grid item xs={4}>
                            <TypeComboBox />
                        </Grid>
                        <Grid item xs={4}>
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
