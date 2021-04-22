import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { getAuthToken } from '../../app/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, ListItemSecondaryAction, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autosuggestion from '../../components/AutoSuggestion';
import { useSelector } from 'react-redux';
import { ingredients, fetchAddIngredient } from '../../slice/ingredients/ingredientsSlice';
import { fetchGetIngredientsByRecipes } from '../../slice/ingredients/ingredientsFetch';
import { unities, fetchAddUnity } from '../../slice/unity/unitySlice';
import { IngredientsGroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
import { useAppDispatch } from '../../app/store';
import { numberPartsRecipe } from './StepTwo';

type onRemove = (ingredient: IngredientsGroceryList, index: number) => void;
type onValidateIngredientsList = (ingredientsList: IngredientsGroceryList[]) => void;

type IngredientListProps = {
    ingredients: IngredientsGroceryList[];
    onRemoveIngredient: onRemove;
    onValidateList: onValidateIngredientsList;
};

// IngredientsList component
// Component that display all ingredients from recipes selected into a list
//
// It is possible to delete an ingredient by clicking on the EditIcon in the same row

const IngredientsList = (props: IngredientListProps) => {
    useEffect(() => {
        props.onValidateList(props.ingredients);
    }, [props.ingredients]);
    console.log('props.ingredients', props.ingredients);
    return (
        <List>
            {props.ingredients.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={'CheckIngredientsList' + index}>
                        <ListItemText
                            primary={ingredient.ingredient}
                            secondary={ingredient.quantity + ' ' + ingredient.unity}
                            id={index.toString()}
                        />
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

export interface RequestAddGroceryList {
    ingredients: IngredientsGroceryList[];
}

interface AddMoreIngredientsProps {
    numberPartsByRecipe: numberPartsRecipe[];
    onValidation: onValidateIngredientsList;
}

// AddMoreIngredients component : Third and last step of <GroceryListStepper />
// Component which allows you to add more ingredient to the final grocery list
const AddMoreIngredients = (props: AddMoreIngredientsProps): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const allIngredients = useSelector(ingredients);
    const allUnities = useSelector(unities);

    const [newIngredientsList, setNewIngredientsList] = useState<RequestAddGroceryList>({
        ingredients: [],
    });

    const [ingredientRecipe, setIngredientRecipe] = useState<IngredientsGroceryList>({
        recipe_id: 0,
        ingredient: '',
        ingredient_id: 0,
        unity: '',
        unity_id: 0,
        quantity: 0,
        checked: 0,
    });

    const removeIngredientList = (elt: IngredientsGroceryList, index: number) => {
        if (newIngredientsList.ingredients) {
            const newingredientRow = newIngredientsList.ingredients.filter((_, i) => i !== index);
            setNewIngredientsList({ ...newIngredientsList, ingredients: newingredientRow });
        }
    };

    // Execute the effect when the component is mounting
    useEffect(() => {
        const token = async () => {
            const idToken = await getAuthToken();
            const getIngredients = fetchGetIngredientsByRecipes(idToken, props.numberPartsByRecipe);
            const ingredientsList = async () => {
                const list = await getIngredients;
                setNewIngredientsList({ ...newIngredientsList, ingredients: list });
            };
            ingredientsList();
        };
        token();
    }, []);

    return (
        <Container>
            <h1 style={{ marginBottom: 40 }}>{t('stepper.title-ingredientsList')}</h1>
            <Grid container spacing={1} style={{ alignItems: 'center', marginBottom: 10 }}>
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
                        onChange={(event) =>
                            setIngredientRecipe({
                                ...ingredientRecipe,
                                quantity: Number(event.currentTarget.value),
                            })
                        }
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
                            if (newIngredientsList.ingredients) {
                                const newIngredientRow = newIngredientsList.ingredients.concat(ingredientRecipe);
                                setNewIngredientsList({ ...newIngredientsList, ingredients: newIngredientRow });
                                setIngredientRecipe({
                                    ...ingredientRecipe,
                                });
                            }
                        }}
                    >
                        <AddCircleOutlineOutlinedIcon style={{ fontSize: 30, color: '#9ebdd8' }} />
                    </IconButton>
                </Grid>
            </Grid>
            <Box style={{ paddingBottom: '30px' }}>
                <IngredientsList
                    ingredients={newIngredientsList.ingredients}
                    onValidateList={(ingredientsList) => {
                        if (props.onValidation) {
                            props.onValidation(ingredientsList);
                        }
                    }}
                    onRemoveIngredient={removeIngredientList}
                />
            </Box>
        </Container>
    );
};

export default AddMoreIngredients;
