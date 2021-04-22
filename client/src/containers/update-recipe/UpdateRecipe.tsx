import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// Slice - Store
import { useAppDispatch } from '../../app/store';
import { ingredients, fetchAddIngredient } from '../../slice/ingredients/ingredientsSlice';
import { unities, fetchAddUnity } from '../../slice/unity/unitySlice';
import { fetchUpdateRecipe, fetchGetARecipe, selectRecipe } from '../../slice/recipe/recipeSlice';
import { RecipeInformation, IngredientsRecipe } from '../../slice/recipe/recipeFetch';
import { updateNotification } from '../../slice/notification/notificationSlice';
// Component
import Autosuggestion from '../../components/AutoSuggestion';
// Material-ui
import {
    TextField,
    Box,
    FormControl,
    IconButton,
    Container,
    Grid,
    Input,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import FormHelperText from '@material-ui/core/FormHelperText';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

type onRemove = (ingredient: IngredientsRecipe, index: number) => void;

type IngredientsListProps = {
    ingredientsList: IngredientsRecipe[];
    onRemoveIngredient: onRemove;
};

// IngredientsList component
//
// Display all ingredients added to the recipe into a TableContainer with 3 rows :
// - Ingredient
// - Quantity
// - Unity
const IngredientsList = (props: IngredientsListProps): JSX.Element => {
    return (
        <>
            <TableContainer style={{ width: '100%' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: 20 }}></TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: 20 }}></TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: 20 }}></TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: 20 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.ingredientsList.map((ingredient, index) => (
                            <TableRow key={ingredient.ingredient}>
                                <TableCell component="th" scope="row" style={{ fontSize: 15 }}>
                                    {ingredient.ingredient}
                                </TableCell>
                                <TableCell align="center" style={{ fontSize: 15 }}>
                                    {ingredient.quantity}
                                </TableCell>
                                <TableCell align="center" style={{ fontSize: 15 }}>
                                    {ingredient.unity}
                                </TableCell>
                                <TableCell align="center" style={{ fontSize: 15 }}>
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

interface Params {
    id: string;
}

// UpdateRecipe component
// Component that allows to update a recipe by id on the profil account connected.
//
// It is possible using <Textfield /> or <Autosuggestion /> components to update:
// - name
// - short presentation of the recipe (example: 'Recipe found in Book 'Recipes' p.130)
// - time of preparation
// - time of cooking
// - number of parts
// - ingredients list
//
// Comments :
// (1) - Impossible to update a recipe without a title
// (2) - Impossible to enter an ingredient if the ingredient, the quantity or the unity is missing

const UpdateRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const { id } = useParams<Params>();

    const dispatch = useAppDispatch();
    const history = useHistory();

    const recipe = useSelector(selectRecipe);
    const allIngredients = useSelector(ingredients);
    const allUnities = useSelector(unities);

    const [updateRecipe, setUpdateRecipe] = useState<RecipeInformation>(recipe);
    const [error, setError] = useState<boolean>(false);
    const [requiredField, setRequiredField] = useState<string>('');

    const [ingredientRecipe, setIngredientRecipe] = useState<IngredientsRecipe>({
        ingredient: '',
        ingredient_id: 0,
        unity: '',
        unity_id: 0,
        quantity: 0,
    });

    const removeIngredientList = (elt: IngredientsRecipe, index: number) => {
        if (updateRecipe.ingredients[index]) {
            const newingredientRow = updateRecipe.ingredients.filter((_, i) => i !== index);
            setUpdateRecipe({ ...updateRecipe, ingredients: newingredientRow });
        }
    };

    useEffect(() => {
        setUpdateRecipe(recipe);
    }, [recipe]);

    useEffect(() => {
        dispatch(fetchGetARecipe(Number(id)));
    }, []);

    return (
        <Container>
            <form>
                <h1 style={{ marginBottom: 40 }}>{t('update_recipe.title-page')}</h1>
                <Box className="title" style={{ marginBottom: 40 }}>
                    <p style={{ marginBottom: 5 }}>{t('new_recipe.title')}</p>
                    <FormControl error={error} required={true}>
                        <InputLabel>{t('new_recipe.add-title')}</InputLabel>
                        <Input
                            id="component-error"
                            value={updateRecipe.name}
                            onChange={(event) => {
                                setUpdateRecipe({ ...updateRecipe, name: event.currentTarget.value });
                            }}
                        />
                        <FormHelperText id="component-error-text">{requiredField}</FormHelperText>
                    </FormControl>
                </Box>
                <Box style={{ marginBottom: 40 }}>
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
                <Box style={{ marginBottom: 40 }}>
                    <p>{t('new_recipe.parts')}</p>
                    <TextField
                        value={updateRecipe.number_parts}
                        placeholder={t('new_recipe.parts_add')}
                        onChange={(event) => {
                            setUpdateRecipe({ ...updateRecipe, number_parts: Number(event.currentTarget.value) });
                        }}
                    />
                </Box>
                <Grid container spacing={3} style={{ marginBottom: 20 }}>
                    <Grid item xs={6} className="preparation-time" style={{ display: 'block' }}>
                        <p>{t('new_recipe.preparation-time')}</p>
                        <Box style={{ display: 'flex', width: '70%' }}>
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
                    <Grid item xs={6} className="cooking-time" style={{ display: 'block' }}>
                        <p>{t('new_recipe.cooking-time')}</p>
                        <Box style={{ display: 'flex', width: '70%' }}>
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
                    <div>
                        <Grid container spacing={1} style={{ alignItems: 'center' }}>
                            <Grid item xs={6} sm={3}>
                                <Autosuggestion
                                    label={t('new_recipe.add-ingredient')}
                                    onSelect={(option) => {
                                        setIngredientRecipe({
                                            ...ingredientRecipe,
                                            ingredient_id: option.id ? option.id : 0,
                                            ingredient: option.name,
                                        });
                                    }}
                                    onAdd={async (option) => {
                                        const ingredient = await dispatch(fetchAddIngredient(option));
                                        const result = unwrapResult(ingredient);
                                        setIngredientRecipe({
                                            ...ingredientRecipe,
                                            ingredient_id: result.id,
                                            ingredient: result.name,
                                        });
                                    }}
                                    options={allIngredients}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    label={t('new_recipe.add-quantity')}
                                    variant="outlined"
                                    onChange={(event) => {
                                        // Display error notification if type of quantity is not a number
                                        const val = Number(event.currentTarget.value);
                                        if (isNaN(val)) {
                                            dispatch(
                                                updateNotification({
                                                    message: t('new_recipe.quantity-typeof'),
                                                    severity: 'error',
                                                }),
                                            );
                                            return;
                                        }
                                        setIngredientRecipe({
                                            ...ingredientRecipe,
                                            quantity: val,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Autosuggestion
                                    label={t('new_recipe.add-unity')}
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
                            <Grid item xs={6} sm={3} style={{ textAlign: 'center' }}>
                                <IconButton
                                    onClick={() => {
                                        if (updateRecipe.ingredients) {
                                            // Display error notification if ingredient, quantity or unity is missing
                                            if (
                                                !ingredientRecipe.ingredient ||
                                                !ingredientRecipe.quantity ||
                                                !ingredientRecipe.unity
                                            ) {
                                                dispatch(
                                                    updateNotification({
                                                        message: t('new_recipe.bad-ingredients'),
                                                        severity: 'error',
                                                    }),
                                                );
                                                return;
                                            }
                                            const sameIngredient = updateRecipe.ingredients.find(
                                                (ing) => ing.ingredient_id === ingredientRecipe.ingredient_id,
                                            );
                                            // Display error notification if the ingredient is already added to the list
                                            if (sameIngredient) {
                                                dispatch(
                                                    updateNotification({
                                                        message: t('new_recipe.same-ingredient'),
                                                        severity: 'error',
                                                    }),
                                                );
                                                return;
                                            }
                                            const newIngredientRow = updateRecipe.ingredients.concat(ingredientRecipe);
                                            setUpdateRecipe({ ...updateRecipe, ingredients: newIngredientRow });
                                            setIngredientRecipe({
                                                ...ingredientRecipe,
                                                ingredient: '',
                                                ingredient_id: 0,
                                            });
                                        }
                                    }}
                                >
                                    <AddCircleOutlineOutlinedIcon style={{ fontSize: 30, color: '#9ebdd8' }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                    <IngredientsList
                        ingredientsList={updateRecipe.ingredients}
                        onRemoveIngredient={removeIngredientList}
                    />
                    <Box style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
                        <IconButton
                            onClick={() => {
                                // Display error notification if name is missing
                                if (updateRecipe.name == '') {
                                    setRequiredField(t('new_recipe.field-missing'));
                                    setError(true);
                                    dispatch(
                                        updateNotification({
                                            message: t('new_recipe.error'),
                                            severity: 'error',
                                        }),
                                    );
                                    return;
                                }
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
                                    .catch((e) => console.error(e));
                            }}
                        >
                            <CheckIcon style={{ fontSize: 25, color: '#ff8a65' }} />
                        </IconButton>
                    </Box>
                </Box>
            </form>
        </Container>
    );
};

export default UpdateRecipe;
