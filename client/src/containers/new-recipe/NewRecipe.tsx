import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TagsBox from '../../components/Tags';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Autosuggestion from '../../components/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { ingredients, fetchAddIngredient } from '../../slice/ingredients/ingredientsSlice';
import { unities, fetchAddUnity } from '../../slice/unity/unitySlice';
import { fetchAddRecipe } from '../../slice/recipes/recipesSlice';

type onRemove = (ingredient: IngredientRecipe, index: number) => void;

type IngredientsListProps = {
    ingredientsList: IngredientRecipe[];
    onRemoveIngredient: onRemove;
};

const IngredientsList = (props: IngredientsListProps): JSX.Element => {
    return (
        <List>
            {props.ingredientsList.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemText primary={ingredient.name} id={index.toString()} />
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

interface IngredientRecipe {
    ingredient_id?: number;
    name: string;
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

    const dispatch = useDispatch();

    const allIngredients = useSelector(ingredients);
    const allUnities = useSelector(unities);

    const [recipe, setRecipe] = useState<RequestAddRecipe>({
        name: '',
        presentation: '',
        time_preparation: '',
        time_cooking: '',
        number_parts: 2,
        ingredients: [],
    });

    const [ingredientsRow, setIngredientRow] = useState<IngredientRecipe[]>([]);

    const [ingredientRecipe, setIngredientRecipe] = useState<IngredientRecipe>({
        name: '',
        ingredient_id: undefined,
        unity: '',
        unity_id: undefined,
        quantity: undefined,
    });

    const removeIngredientList = (elt: IngredientRecipe, index: number) => {
        if (ingredientsRow[index]) {
            const newingredientRow = ingredientsRow.filter((_, i) => i !== index);
            setIngredientRow(newingredientRow);
        }
    };

    return (
        <Container>
            <form>
                <h1>{t('new_recipe.title-page')}</h1>
                <Box className="title">
                    <p>{t('new_recipe.title')}</p>
                    <TextField
                        placeholder={t('new_recipe.add-title')}
                        onChange={(event) => {
                            setRecipe({ ...recipe, name: event.currentTarget.value });
                        }}
                    />
                </Box>
                <Box className="image">
                    <p>{t('new_recipe.image')}</p>
                    <Button variant="contained">{t('new_recipe.add-image')}</Button>
                </Box>
                <Box>
                    <p>{t('new_recipe.presentation')}</p>
                    <TextField
                        fullWidth
                        placeholder={t('new_recipe.add-presentation')}
                        onChange={(event) => {
                            setRecipe({ ...recipe, presentation: event.currentTarget.value });
                        }}
                    />
                </Box>
                <Box className="image">
                    <p>{t('new_recipe.description')}</p>
                    <Button variant="contained">{t('new_recipe.add-description')}</Button>
                </Box>
                <Box>
                    <TagsBox />
                </Box>
                <Box>
                    <p>{t('new_recipe.parts')}</p>
                    <TextField
                        placeholder={t('new_recipe.parts_add')}
                        onChange={(event) => {
                            setRecipe({ ...recipe, number_parts: Number(event.currentTarget.value) });
                        }}
                    />
                </Box>
                <Grid container spacing={9}>
                    <Grid item xs={5} className="preparation-time" style={{ display: 'block' }}>
                        <p>{t('new_recipe.preparation-time')}</p>
                        <Box style={{ display: 'flex' }}>
                            <TextField
                                fullWidth
                                placeholder={t('new_recipe.add-time')}
                                margin="normal"
                                onChange={(event) => {
                                    setRecipe({ ...recipe, time_preparation: event.currentTarget.value });
                                }}
                            />
                            <p>{t('new_recipe.minute')}</p>
                        </Box>
                    </Grid>
                    <Grid item xs={5} className="cooking-time" style={{ display: 'block' }}>
                        <p>{t('new_recipe.cooking-time')}</p>
                        <Box style={{ display: 'flex' }}>
                            <TextField
                                fullWidth
                                placeholder={t('new_recipe.add-time')}
                                margin="normal"
                                onChange={(event) => {
                                    setRecipe({ ...recipe, time_cooking: event.currentTarget.value });
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
                                        name: option.name,
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
                                    const newIngredientRow = ingredientsRow.concat(ingredientRecipe);
                                    setIngredientRow(newIngredientRow);
                                    setRecipe({ ...recipe, ingredients: newIngredientRow });
                                    setIngredientRecipe({
                                        ...ingredientRecipe,
                                        name: '',
                                        ingredient_id: undefined,
                                        unity: '',
                                        unity_id: undefined,
                                        quantity: undefined,
                                    });
                                }}
                            >
                                {t('new_recipe.add')}
                            </Button>
                        </Grid>
                    </Grid>
                    <IngredientsList ingredientsList={ingredientsRow} onRemoveIngredient={removeIngredientList} />
                    <Box style={{ width: '100%' }}>
                        <IconButton onClick={() => dispatch(fetchAddRecipe(recipe))}>
                            <LibraryAddIcon style={{ fontSize: 25, marginLeft: 'auto', marginRight: 'auto' }} />
                        </IconButton>
                    </Box>
                </Box>
            </form>
        </Container>
    );
};

export default NewRecipe;
