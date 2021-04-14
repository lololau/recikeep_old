import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Autosuggestion from '../../components/Autocomplete';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import { ingredients, fetchAddIngredient } from '../../slice/ingredients/ingredientsSlice';
import { unities, fetchAddUnity } from '../../slice/unity/unitySlice';
import { fetchAddRecipe } from '../../slice/recipes/recipesSlice';
import { updateNotification } from '../../slice/notification/notificationSlice';

type onRemove = (ingredient: IngredientRecipe, index: number) => void;

type IngredientsListProps = {
    ingredientsList: IngredientRecipe[];
    onRemoveIngredient: onRemove;
};

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

interface IngredientRecipe {
    ingredient_id: number;
    ingredient: string;
    unity_id?: number;
    unity: string;
    quantity?: number;
}

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
        if (newRecipe.name == '') {
            setRequiredField(t('new_recipe.field-missing'));
            setError(true);
            dispatch(updateNotification({ message: t('new_recipe.field-missing'), severity: 'error' }));
            return false;
        }
        try {
            console.log('fetch add recipe');
            const action = await dispatch(fetchAddRecipe(newRecipe));
            const result = unwrapResult(action);
            console.log('result: ', result);
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
                                style={{ maxWidth: 200 }}
                                label={t('new_recipe.add-quantity')}
                                variant="outlined"
                                onChange={(event) => {
                                    if (Number(event.currentTarget.value) === NaN) {
                                        alert(t('new_recipe.quantity-typeof'));
                                        return false;
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
                                        unity_id: option.id,
                                        unity: option.name,
                                    });
                                }}
                                onAdd={async (option) => {
                                    const unity = await dispatch(fetchAddUnity(option));
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
                                    console.log('sameIngredient: ', sameIngredient);
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
