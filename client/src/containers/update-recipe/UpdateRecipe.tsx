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
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Autosuggestion from '../../components/Autocomplete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
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
                <h1 style={{ marginBottom: 40 }}>{t('update_recipe.title-page')}</h1>
                <Box className="title" style={{ marginBottom: 40 }}>
                    <p>{t('new_recipe.title')}</p>
                    <TextField
                        value={updateRecipe.name}
                        placeholder={t('new_recipe.add-title')}
                        onChange={(event) => {
                            setUpdateRecipe({ ...updateRecipe, name: event.currentTarget.value });
                        }}
                    />
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
                                            ingredient_id: option.id,
                                            ingredient: option.name,
                                        });
                                    }}
                                    onAdd={(option) => dispatch(fetchAddIngredient(option))}
                                    options={allIngredients}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    label={t('new_recipe.add-quantity')}
                                    variant="outlined"
                                    onChange={(event) => {
                                        const val = Number(event.currentTarget.value);
                                        if (isNaN(val)) {
                                            alert(t('new_recipe.quantity-typeof'));
                                            return false;
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
                            <Grid item xs={6} sm={3}>
                                <Button
                                    onClick={() => {
                                        if (updateRecipe.ingredients) {
                                            if (
                                                ingredientRecipe.ingredient &&
                                                ingredientRecipe.quantity &&
                                                ingredientRecipe.unity
                                            ) {
                                                const newIngredientRow = updateRecipe.ingredients.concat(
                                                    ingredientRecipe,
                                                );
                                                setUpdateRecipe({ ...updateRecipe, ingredients: newIngredientRow });
                                                setIngredientRecipe({
                                                    ...ingredientRecipe,
                                                });
                                            }
                                            alert(t('new_recipe.field-missing'));
                                        }
                                    }}
                                >
                                    {t('new_recipe.add')}
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <IngredientsList
                        ingredientsList={updateRecipe.ingredients}
                        onRemoveIngredient={removeIngredientList}
                    />
                    <Box style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
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
                            <AddCircleOutlineOutlinedIcon style={{ fontSize: 25 }} />
                        </IconButton>
                    </Box>
                </Box>
            </form>
        </Container>
    );
};

export default UpdateRecipe;
