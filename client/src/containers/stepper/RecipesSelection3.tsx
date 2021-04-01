import React, { FC, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autosuggestion from '../../components/Autocomplete';
import { useSelector } from 'react-redux';
import { token } from '../../slice/user/userSlice';
import { ingredients, fetchAddIngredient } from '../../slice/ingredients/ingredientsSlice';
import { fetchGetIngredientsByRecipes } from '../../slice/ingredients/ingredientsFetch';
import { unities, fetchAddUnity } from '../../slice/unity/unitySlice';
import { IngredientsGroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
import { useAppDispatch } from '../../app/store';
import { numberPartsRecipe } from './RecipesSelection2';

type onRemove = (ingredient: IngredientsGroceryList, index: number) => void;
type onValidateIngredientsList = (ingredientsList: IngredientsGroceryList[]) => void;

type IngredientListProps = {
    ingredients: IngredientsGroceryList[];
    onRemoveIngredient: onRemove;
    onValidateList: onValidateIngredientsList;
};

const CheckIngredientsList: FC<IngredientListProps> = (props) => {
    useEffect(() => {
        props.onValidateList(props.ingredients);
    }, [props.ingredients]);
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

const AddMoreIngredients: FC<AddMoreIngredientsProps> = (props): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const allIngredients = useSelector(ingredients);
    const allUnities = useSelector(unities);
    const idToken = useSelector(token);

    const [newIngredientsList, setNewIngredientsList] = useState<RequestAddGroceryList>({
        ingredients: [],
    });

    const [ingredientRecipe, setIngredientRecipe] = useState<IngredientsGroceryList>({
        ingredient: '',
        ingredient_id: undefined,
        unity: '',
        unity_id: undefined,
        quantity: undefined,
    });

    const removeIngredientList = (elt: IngredientsGroceryList, index: number) => {
        if (newIngredientsList.ingredients) {
            const newingredientRow = newIngredientsList.ingredients.filter((_, i) => i !== index);
            setNewIngredientsList({ ...newIngredientsList, ingredients: newingredientRow });
        }
    };

    useEffect(() => {
        const getIngredients = fetchGetIngredientsByRecipes(idToken, props.numberPartsByRecipe);
        const ingredientsList = async () => {
            const list = await getIngredients;
            setNewIngredientsList({ ...newIngredientsList, ingredients: list });
        };
        ingredientsList();
    }, []);

    return (
        <Container>
            <h1 style={{ marginBottom: 50 }}>{t('stepper.title-ingredientsList')}</h1>
            <Grid container spacing={1} style={{ alignItems: 'center', marginBottom: 10 }}>
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
                <Grid item xs={3}>
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
                        <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
            </Grid>
            <CheckIngredientsList
                ingredients={newIngredientsList.ingredients}
                onValidateList={(ingredientsList) => {
                    if (props.onValidation) {
                        props.onValidation(ingredientsList);
                    }
                }}
                onRemoveIngredient={removeIngredientList}
            />
        </Container>
    );
};

export default AddMoreIngredients;
