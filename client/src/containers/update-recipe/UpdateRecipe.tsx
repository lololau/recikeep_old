import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Autosuggestion from '../../components/Autocomplete';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { ingredients, fetchAddIngredient } from '../../slice/ingredients/ingredientsSlice';
import { unities, fetchAddUnity } from '../../slice/unity/unitySlice';
import { fetchUpdateRecipe, fetchGetARecipe, selectRecipe } from '../../slice/recipe/recipeSlice';
import { RecipeInformation, IngredientsRecipe } from '../../slice/recipe/recipeFetch';

type onRemove = (ingredient: IngredientsRecipe, index: number) => void;

type IngredientsListProps = {
    ingredientsList: IngredientsRecipe[];
    onRemoveIngredient: onRemove;
};

const IngredientsList = (props: IngredientsListProps): JSX.Element => {
    return (
        <List>
            {props.ingredientsList.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemText primary={ingredient.ingredient} id={index.toString()} />
                        <ListItemText primary={ingredient.quantity} id={index.toString()} />
                        <ListItemText primary={ingredient.unity} id={index.toString()} />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                onClick={() => {
                                    if (props.onRemoveIngredient) {
                                        props.onRemoveIngredient(ingredient, index);
                                    }
                                }}
                            >
                                <DeleteIcon style={{ fontSize: 15 }} color="primary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

interface Params {
    id: string;
}

const UpdateRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const { id } = useParams<Params>();

    const dispatch = useAppDispatch();
    const history = useHistory();

    const recipe = useSelector(selectRecipe);
    const allIngredients = useSelector(ingredients);
    const allUnities = useSelector(unities);

    console.log(recipe);
    const [updateRecipe, setUpdateRecipe] = useState<RecipeInformation>(recipe);

    const [ingredientRecipe, setIngredientRecipe] = useState<IngredientsRecipe>({
        ingredient: '',
        ingredient_id: undefined,
        unity: '',
        unity_id: undefined,
        quantity: undefined,
    });

    const removeIngredientList = (elt: IngredientsRecipe, index: number) => {
        if (updateRecipe.ingredients[index]) {
            const newingredientRow = updateRecipe.ingredients.filter((_, i) => i !== index);
            setUpdateRecipe({ ...updateRecipe, ingredients: newingredientRow });
        }
    };

    useEffect(() => {
        dispatch(fetchGetARecipe(Number(id)));
    }, []);

    useEffect(() => {
        setUpdateRecipe(recipe);
    }, [recipe]);

    return (
        <Container>
            <form>
                <h1>{t('update_recipe.title-page')}</h1>
                <Box className="title">
                    <p>{t('new_recipe.title')}</p>
                    <TextField
                        value={updateRecipe.name}
                        placeholder={t('new_recipe.add-title')}
                        onChange={(event) => {
                            setUpdateRecipe({ ...updateRecipe, name: event.currentTarget.value });
                        }}
                    />
                </Box>
                <Box>
                    <p>{t('new_recipe.presentation')}</p>
                    <TextField
                        fullWidth
                        value={updateRecipe.presentation}
                        placeholder={t('new_recipe.add-presentation')}
                        onChange={(event) => {
                            setUpdateRecipe({ ...updateRecipe, presentation: event.currentTarget.value });
                        }}
                    />
                </Box>
                <Box>
                    <p>{t('new_recipe.parts')}</p>
                    <TextField
                        value={updateRecipe.number_parts}
                        placeholder={t('new_recipe.parts_add')}
                        onChange={(event) => {
                            setUpdateRecipe({ ...updateRecipe, number_parts: Number(event.currentTarget.value) });
                        }}
                    />
                </Box>
                <Grid container spacing={9}>
                    <Grid item xs={5} className="preparation-time" style={{ display: 'block' }}>
                        <p>{t('new_recipe.preparation-time')}</p>
                        <Box style={{ display: 'flex' }}>
                            <TextField
                                value={updateRecipe.time_preparation}
                                fullWidth
                                placeholder={t('new_recipe.add-time')}
                                margin="normal"
                                onChange={(event) => {
                                    setUpdateRecipe({ ...updateRecipe, time_preparation: event.currentTarget.value });
                                }}
                            />
                            <p>{t('new_recipe.minute')}</p>
                        </Box>
                    </Grid>
                    <Grid item xs={5} className="cooking-time" style={{ display: 'block' }}>
                        <p>{t('new_recipe.cooking-time')}</p>
                        <Box style={{ display: 'flex' }}>
                            <TextField
                                value={updateRecipe.time_cooking}
                                fullWidth
                                placeholder={t('new_recipe.add-time')}
                                margin="normal"
                                onChange={(event) => {
                                    setUpdateRecipe({ ...updateRecipe, time_cooking: event.currentTarget.value });
                                }}
                            />
                            <p>{t('new_recipe.minute')}</p>
                        </Box>
                    </Grid>
                </Grid>
                <Box style={{ marginBottom: 70 }}>
                    <p>{t('new_recipe.ingredients')}</p>
                    <Grid container spacing={4} style={{ marginBottom: 20, alignItems: 'center' }}>
                        <Grid item xs={3}>
                            <Autosuggestion
                                label="add ingredient"
                                onSelect={(option) => {
                                    setIngredientRecipe({
                                        ...ingredientRecipe,
                                        ingredient_id: option.id,
                                        ingredient: option.name,
                                    });
                                }}
                                onAdd={(option) => dispatch(fetchAddIngredient(option))}
                                options={allIngredients}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autosuggestion
                                label="add unit"
                                onSelect={(option) => {
                                    setIngredientRecipe({
                                        ...ingredientRecipe,
                                        unity_id: option.id,
                                        unity: option.name,
                                    });
                                }}
                                onAdd={(option) => dispatch(fetchAddUnity(option))}
                                options={allUnities}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                placeholder="Quantity"
                                variant="outlined"
                                onChange={(event) =>
                                    setIngredientRecipe({
                                        ...ingredientRecipe,
                                        quantity: Number(event.currentTarget.value),
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                onClick={() => {
                                    if (updateRecipe.ingredients) {
                                        const newIngredientRow = updateRecipe.ingredients.concat(ingredientRecipe);
                                        setUpdateRecipe({ ...updateRecipe, ingredients: newIngredientRow });
                                        setIngredientRecipe({
                                            ...ingredientRecipe,
                                            ingredient: '',
                                            ingredient_id: undefined,
                                            unity: '',
                                            unity_id: undefined,
                                            quantity: undefined,
                                        });
                                    }
                                }}
                            >
                                {t('new_recipe.add')}
                            </Button>
                        </Grid>
                    </Grid>
                    <IngredientsList
                        ingredientsList={updateRecipe.ingredients}
                        onRemoveIngredient={removeIngredientList}
                    />
                    <Box style={{ width: '100%' }}>
                        <IconButton
                            onClick={() =>
                                dispatch(
                                    fetchUpdateRecipe({
                                        recipe: updateRecipe,
                                    }),
                                )
                                    .then(unwrapResult)
                                    .then((result) => {
                                        console.log('result: ', result);
                                        history.push(`/recipe/${result.id}`);
                                    })
                                    .catch((e) => console.error(e))
                            }
                        >
                            <LibraryAddIcon style={{ fontSize: 25, marginLeft: 'auto', marginRight: 'auto' }} />
                        </IconButton>
                    </Box>
                </Box>
            </form>
        </Container>
    );
};

export default UpdateRecipe;
