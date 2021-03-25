import React, { FC, useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import Autosuggestion from '../../components/Autocomplete';
import { useSelector } from 'react-redux';
import { ingredients, fetchAddIngredient } from '../../slice/ingredients/ingredientsSlice';
import { unities, fetchAddUnity } from '../../slice/unity/unitySlice';
import { groceryList } from '../../slice/groceryList/groceryListSlice';
import { IngredientsRecipe } from '../../slice/groceryList/groceryListFetch';
import { useAppDispatch } from '../../app/store';

type onRemove = (ingredient: IngredientsRecipe, index: number) => void;

type IngredientListProps = {
    ingredients: IngredientsRecipe[];
    onRemoveIngredient: onRemove;
};

const CheckIngredientsList: FC<IngredientListProps> = (props) => {
    return (
        <List>
            {props.ingredients.map((ingredient, index) => {
                console.log(props.ingredients);
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

const AddMoreIngredients = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const ingredientsList = useSelector(groceryList);
    const allIngredients = useSelector(ingredients);
    const allUnities = useSelector(unities);

    const [newIngredientsList, setNewIngredientsList] = useState(ingredientsList);

    const [ingredientRecipe, setIngredientRecipe] = useState<IngredientsRecipe>({
        ingredient: '',
        ingredient_id: undefined,
        unity: '',
        unity_id: undefined,
        quantity: undefined,
    });

    const onAdd = (ing: IngredientsRecipe) => {
        const newList = [...ingredientsList];
        newList.push(ing);
        console.log('newList', newList);

        setNewIngredientsList(newList);
    };

    const removeIngredientList = (elt: IngredientsRecipe, index: number) => {
        if (newIngredientsList[index]) {
            const newingredientRow = newIngredientsList.filter((_, i) => i !== index);
            setNewIngredientsList(newingredientRow);
        }
    };

    return (
        <Container>
            <h1 style={{ marginBottom: 50 }}>{t('groceryList.title-page')}</h1>
            <Grid container spacing={4} style={{ alignItems: 'center', marginBottom: 10 }}>
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
                            const newIngredientRow = newIngredientsList.concat(ingredientRecipe);
                            setNewIngredientsList(newIngredientRow);
                            setIngredientRecipe({
                                ...ingredientRecipe,
                                ingredient: '',
                                ingredient_id: undefined,
                                unity: '',
                                unity_id: undefined,
                                quantity: undefined,
                            });
                        }}
                    >
                        <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
            </Grid>
            <CheckIngredientsList ingredients={newIngredientsList} onRemoveIngredient={removeIngredientList} />
            <IconButton style={{ marginTop: 10 }}>
                <CheckIcon />
            </IconButton>
        </Container>
    );
};

export default AddMoreIngredients;
