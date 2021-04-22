// Dependencies
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
// Slice - Store
import Autosuggestion from '../../components/AutoSuggestion';
import { useAppDispatch } from '../../app/store';
import { ingredients, addIngredient } from '../../slice/ingredients/ingredientsSlice';
import { unities, addUnity } from '../../slice/unity/unitySlice';
import { addRecipe } from '../../slice/recipes/recipesSlice';
import { updateNotification } from '../../slice/notification/notificationSlice';
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
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';

type onRemove = (ingredient: IngredientRecipe, index: number) => void;

type IngredientsListProps = {
    ingredientsList: IngredientRecipe[];
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
                <Table>
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

interface IngredientRecipe {
    ingredient_id: number;
    ingredient: string;
    unity_id: number;
    unity: string;
    quantity: number;
}

// Required fiels : name, number_parts
interface RequestAddRecipe {
    name: string;
    presentation?: string;
    number_parts: number;
    time_preparation?: string;
    time_cooking?: string;
    recipe_photo_id?: number;
    recipe_description_id?: number;
    ingredients?: IngredientRecipe[];
}

// NewRecipe component
// Component that allows to create a new recipe on the profil account connected.
//
// It is possible using <Textfield /> or <Autosuggestion /> components to enter:
// - name
// - short presentation of the recipe (example: 'Recipe found in Book 'Recipes' p.130)
// - time of preparation
// - time of cooking
// - number of parts
// - ingredients list
//
// Comments :
// (1) - Impossible to enter a recipe without enter its title
// (2) - Impossible to enter an ingredient if the ingredient, the quantity or the unity is missing

const NewRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const history = useHistory();

    const allIngredients = useSelector(ingredients);
    const allUnities = useSelector(unities);

    const [newRecipe, setRecipe] = useState<RequestAddRecipe>({
        name: '',
        presentation: '',
        time_preparation: '',
        time_cooking: '',
        number_parts: 2,
        ingredients: [],
    });

    const [ingredientsRow, setIngredientRow] = useState<IngredientRecipe[]>([]);

    const [ingredientRecipe, setIngredientRecipe] = useState<IngredientRecipe>({
        ingredient: '',
        ingredient_id: 0,
        unity: '',
        unity_id: 0,
        quantity: 0,
    });

    const [error, setError] = useState<boolean>(false);
    const [requiredField, setRequiredField] = useState<string>('');

    const removeIngredientList = (elt: IngredientRecipe, index: number) => {
        if (ingredientsRow[index]) {
            const newingredientRow = ingredientsRow.filter((_, i) => i !== index);
            setIngredientRow(newingredientRow);
        }
    };

    const onSubmit = async () => {
        // Display error notification if name is missing
        if (newRecipe.name == '') {
            setRequiredField(t('new_recipe.field-missing'));
            setError(true);
            dispatch(updateNotification({ message: t('new_recipe.error'), severity: 'error' }));
            return;
        }
        try {
            const action = await dispatch(addRecipe(newRecipe));
            const result = unwrapResult(action);
            history.push(`/recipe/${result.id}`);
        } catch (e) {
            return console.error('add recipe error:', e);
        }
    };

    return (
        <Container>
            <form>
                <h1 style={{ marginBottom: 40 }}>{t('new_recipe.title-page')}</h1>
                <Box className="title" style={{ marginBottom: 40 }}>
                    <p style={{ marginBottom: 5 }}>{t('new_recipe.title')}</p>
                    <FormControl error={error} required={true}>
                        <InputLabel>{t('new_recipe.add-title')}</InputLabel>
                        <Input
                            id="component-error"
                            value={newRecipe.name}
                            onChange={(event) => {
                                setRecipe({ ...newRecipe, name: event.currentTarget.value });
                            }}
                        />
                        <FormHelperText id="component-error-text">{requiredField}</FormHelperText>
                    </FormControl>
                </Box>
                <Box style={{ marginBottom: 40 }}>
                    <p>{t('new_recipe.presentation')}</p>
                    <TextField
                        fullWidth
                        placeholder={t('new_recipe.add-presentation')}
                        onChange={(event) => {
                            setRecipe({ ...newRecipe, presentation: event.currentTarget.value });
                        }}
                    />
                </Box>
                <Box style={{ marginBottom: 40 }}>
                    <p>{t('new_recipe.parts')}</p>
                    <TextField
                        placeholder={t('new_recipe.parts_add')}
                        onChange={(event) => {
                            setRecipe({ ...newRecipe, number_parts: Number(event.currentTarget.value) });
                        }}
                    />
                </Box>
                <Grid container spacing={3} style={{ marginBottom: 30 }}>
                    <Grid item xs={6} className="preparation-time" style={{ display: 'block' }}>
                        <p>{t('new_recipe.preparation-time')}</p>
                        <Box style={{ display: 'flex', width: '70%' }}>
                            <TextField
                                fullWidth
                                placeholder={t('new_recipe.add-time')}
                                margin="normal"
                                onChange={(event) => {
                                    setRecipe({ ...newRecipe, time_preparation: event.currentTarget.value });
                                }}
                            />
                            <p>{t('new_recipe.minute')}</p>
                        </Box>
                    </Grid>
                    <Grid item xs={6} className="cooking-time" style={{ display: 'block' }}>
                        <p>{t('new_recipe.cooking-time')}</p>
                        <Box style={{ display: 'flex', width: '70%' }}>
                            <TextField
                                fullWidth
                                placeholder={t('new_recipe.add-time')}
                                margin="normal"
                                onChange={(event) => {
                                    setRecipe({ ...newRecipe, time_cooking: event.currentTarget.value });
                                }}
                            />
                            <p>{t('new_recipe.minute')}</p>
                        </Box>
                    </Grid>
                </Grid>
                <Box style={{ marginBottom: 70 }}>
                    <p>{t('new_recipe.ingredients')}</p>
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
                                    const ingredient = await dispatch(addIngredient(option));
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
                                style={{ maxWidth: 200 }}
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
                                        quantity: Number(event.currentTarget.value),
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
                                        unity_id: option.id ? option.id : 0,
                                        unity: option.name,
                                    });
                                }}
                                onAdd={async (option) => {
                                    const unity = await dispatch(addUnity(option));
                                    const result = unwrapResult(unity);
                                    setIngredientRecipe({
                                        ...ingredientRecipe,
                                        unity_id: result.id,
                                        unity: result.name,
                                    });
                                }}
                                options={allUnities}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} style={{ textAlign: 'center' }}>
                            <IconButton
                                onClick={() => {
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
                                    const sameIngredient = ingredientsRow.find(
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
                                    const newIngredientRow = ingredientsRow.concat(ingredientRecipe);
                                    setIngredientRow(newIngredientRow);
                                    setRecipe({ ...newRecipe, ingredients: newIngredientRow });
                                    setIngredientRecipe({
                                        ...ingredientRecipe,
                                        ingredient: '',
                                        ingredient_id: 0,
                                    });
                                }}
                            >
                                <AddCircleOutlineOutlinedIcon style={{ fontSize: 30, color: '#9ebdd8' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Box
                        style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <IngredientsList ingredientsList={ingredientsRow} onRemoveIngredient={removeIngredientList} />
                    </Box>
                    <Box style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
                        <IconButton
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                onSubmit();
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

export default NewRecipe;
