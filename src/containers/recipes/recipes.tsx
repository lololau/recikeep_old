import '../../i18n';
//import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ToolsBar from '../toolsbar/toolsbar'
// import MyRecipe from '../recipe/recipe';
import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';

import InputBase from '@material-ui/core/InputBase';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
//import SearchIcon from '@material-ui/icons/Search';


type recipe = {
    title: string,
};

type recipes = recipe[];

type RecipesListProps = {
    recipes: recipe[]
}

const myRecipes: recipes = [
    { title: "Pates Carbonara" },
    { title: "Poulet cury" }
];


const TypeComboBox = () => {
    const { t } = useTranslation();

    const typeList = [
        { type: t('types.appetizer') },
        { type: t('types.starter') },
        { type: t('types.lunch') },
        { type: t('types.dinner') },
        { type: t('types.dessert') },
        { type: t('types.sides') }
    ]

    return (
        <Autocomplete
            id="combo-box-demo"
            options={typeList}
            getOptionLabel={(option) => option.type}
            style={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label={t('recipe.type')} variant="outlined" />}
        />
    );
}

const TagsComboBox = () => {
    const { t } = useTranslation();

    const tagList = [
        { tag: t('tags.vegetables') },
        { tag: t('tags.meat') },
        { tag: t('tags.fish') },
        { tag: t('tags.fruits') }
    ]

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
}

const RecipesList: FunctionComponent<RecipesListProps> = (props) => {
    //const dispatch = useDispatch();

    return (
        <List style={{ width: 300 }}>
            {props.recipes.map((recipe, index) => {
                return (
                    <ListItem
                        divider={true}
                        key={index}>
                        <ListItemText
                            primary={recipe.title}
                            id={index.toString()} />
                        <ListItemSecondaryAction >
                            <IconButton >
                                <FavoriteIcon style={{ fontSize: 15 }} color="primary"/>
                            </IconButton>
                            <IconButton >
                                <EditIcon style={{ fontSize: 15 }} color="primary"/>
                            </IconButton>
                            <IconButton >
                                <PresentToAllIcon style={{ fontSize: 15 }} color="primary"/>
                            </IconButton>
                            <IconButton edge="end" >
                                <DeleteIcon style={{ fontSize: 15 }} color="primary"/>
                            </IconButton>

                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}
        </List>
    )
}

const HomeRecipes = () => {
    const { t } = useTranslation();

    return (
        <div className="recipes">
            <h1>{t('recipes.title')}</h1>
            <IconButton >
                <AddCircleOutlineOutlinedIcon color="primary"/>
            </IconButton>
            <InputBase
              placeholder={t('recipe.searchBar')}
            />
            <TagsComboBox />
            <TypeComboBox />
            <Button color="primary">{t('recipes.selectRecipes')}</Button>

            <div className="RecipesList">
                <RecipesList recipes={myRecipes} />
            </div>


            <ToolsBar />
        </div>
    );
}

export default HomeRecipes;