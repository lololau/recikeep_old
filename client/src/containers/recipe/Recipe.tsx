import { useTranslation } from 'react-i18next/';
import '../../i18n';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EcoIcon from '@material-ui/icons/Eco';
import instructions_image from './description_recipe.png';
import { selectRecipe } from '../../slice/recipe/recipeSlice';
import { IngredientsRecipe } from '../../slice/recipe/recipeFetch';

type IngredientListProps = {
    ingredients: IngredientsRecipe[];
};

const IngredientsListRecipe: FC<IngredientListProps> = (props) => {
    return (
        <List style={{ maxWidth: 200, marginLeft: 'auto', marginRight: 'auto' }}>
            {props.ingredients.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemIcon>
                            <EcoIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={ingredient.ingredient}
                            secondary={ingredient.quantity + ' ' + ingredient.unity}
                            id={index.toString()}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

const MyRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const recipe = useSelector(selectRecipe);

    return (
        <Container>
            <Grid
                spacing={4}
                container
                style={{
                    alignItems: 'center',
                    width: '100%',
                    position: 'fixed',
                    zIndex: 1,
                    top: 0,
                    backgroundColor: 'white',
                }}
            >
                <Grid item xs={6} className="title-page">
                    <h1>{recipe.name}</h1>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <IconButton>
                        <EditIcon style={{ fontSize: 20 }} color="primary" />
                    </IconButton>
                    <IconButton edge="end">
                        <DeleteIcon style={{ fontSize: 20 }} color="primary" />
                    </IconButton>
                </Grid>
            </Grid>
            <Box className="image_and_time_table" style={{ width: '100%', position: 'relative', marginTop: 60 }}>
                <Avatar
                    variant="rounded"
                    style={{
                        width: 400,
                        height: 300,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        justifyContent: 'start',
                    }}
                    alt="pate_carbonara"
                    src="https://img.static-rmg.be/a/food/image/q75/w1280/h720/1086366/spaghetti-carbonara.jpg"
                />
                <Grid
                    spacing={3}
                    container
                    className="time_and_parts_table"
                    style={{
                        textAlign: 'center',
                        marginRight: 'auto',
                        alignItems: 'center',
                        marginBottom: 60,
                    }}
                >
                    <Grid item xs={4} className="preparation_time">
                        <h4>{t('recipe.preparation-time')}</h4>
                        <p>{recipe.time_preparation} min</p>
                    </Grid>
                    <Grid item xs={4} className="cooking_time">
                        <h4>{t('recipe.cooking-time')}</h4>
                        <p>{recipe.time_cooking} min</p>
                    </Grid>
                    <Grid item xs={4} className="parts">
                        <Grid container spacing={3} style={{ alignItems: 'center' }}>
                            <Grid item xs>
                                <p>{recipe.number_parts}</p>
                            </Grid>
                            <Grid item xs>
                                <PersonIcon />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ textAlign: 'center' }}>
                <h3>{t('recipe.ingredients-list')}</h3>
                <IngredientsListRecipe ingredients={recipe.ingredients} />
            </Box>
            <Box className="cooking_instructions" style={{ textAlign: 'center', marginTop: 75 }}>
                <h3>{t('recipe.cooking-instructions')}</h3>
                <img
                    style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}
                    alt="pates_carbonara_instructions"
                    src={instructions_image}
                />
            </Box>
        </Container>
    );
};

export default MyRecipe;
