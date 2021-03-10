import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TagsBox from '../../components/Tags';
import { PartsComboBox } from '../stepper/RecipesSelection2';
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

type onRemove = (ingredient: IngredientRecipe, index: number) => void;

type IngredientsListProps = {
    ingredientsList: IngredientRecipe[];
    onRemoveIngredient: onRemove;
};

interface IngredientRecipe {
    name: string;
    unity: string;
    quantity: number;
}

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

const NewRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const allIngredients = useSelector(ingredients);
    const allUnities = useSelector(unities);

    const [ingredientRow, setIngredientRow] = useState<IngredientRecipe[]>([]);

    const [nameIngredient, setNameIngredient] = useState('');
    const [unityIngredient, setUnityIngredient] = useState('');
    const [quantityIngredient, setQuantityIngredient] = useState(0);

    const ingredient: IngredientRecipe = { name: nameIngredient, unity: unityIngredient, quantity: quantityIngredient };

    const removeIngredientList = (elt: IngredientRecipe, index: number) => {
        if (ingredientRow[index]) {
            const newingredientRow = ingredientRow.filter((_, i) => i !== index);
            setIngredientRow(newingredientRow);
        }
    };

    return (
        <Container>
            <h1>{t('new_recipe.title-page')}</h1>
            <br />
            <Box className="title">
                <p>{t('new_recipe.title')}</p>
                <TextField placeholder={t('new_recipe.add-title')} />
            </Box>
            <br />
            <br />
            <Box className="image">
                <p>{t('new_recipe.image')}</p>
                <Button variant="contained">{t('new_recipe.add-image')}</Button>
            </Box>
            <br />
            <br />
            <Box>
                <p>{t('new_recipe.presentation')}</p>
                <TextField fullWidth placeholder={t('new_recipe.add-presentation')} />
            </Box>
            <br />
            <br />
            <Box className="image">
                <p>{t('new_recipe.description')}</p>
                <Button variant="contained">{t('new_recipe.add-description')}</Button>
            </Box>
            <br />
            <br />
            <Box>
                <TagsBox />
            </Box>
            <br />
            <br />
            <Box>
                <PartsComboBox />
            </Box>
            <br />
            <br />
            <Grid container spacing={9}>
                <Grid item xs={5} className="preparation-time" style={{ display: 'block' }}>
                    <p>{t('new_recipe.preparation-time')}</p>
                    <Box style={{ display: 'flex' }}>
                        <TextField fullWidth placeholder={t('new_recipe.add-time')} margin="normal" />
                        <p>{t('new_recipe.minute')}</p>
                    </Box>
                </Grid>
                <Grid item xs={5} className="cooking-time" style={{ display: 'block' }}>
                    <p>{t('new_recipe.cooking-time')}</p>
                    <Box style={{ display: 'flex' }}>
                        <TextField fullWidth placeholder={t('new_recipe.add-time')} margin="normal" />
                        <p>{t('new_recipe.minute')}</p>
                    </Box>
                </Grid>
            </Grid>
            <br />
            <br />
            <Box style={{ marginBottom: 70 }}>
                <p>{t('new_recipe.ingredients')}</p>
                <Grid container spacing={4} style={{ marginBottom: 20, alignItems: 'center' }}>
                    <Grid item xs={3}>
                        <Autosuggestion
                            label="add ingredient"
                            onSelect={(option) => setNameIngredient(option.name)}
                            onAdd={(option) => dispatch(fetchAddIngredient(option))}
                            options={allIngredients}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autosuggestion
                            label="add unit"
                            onSelect={(option) => setUnityIngredient(option.name)}
                            onAdd={(option) => dispatch(fetchAddUnity(option))}
                            options={allUnities}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            placeholder="Quantity"
                            variant="outlined"
                            onChange={(event) => setQuantityIngredient(Number(event.currentTarget.value))}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            onClick={() => {
                                const newIngredientRow = ingredientRow.concat(ingredient);
                                setIngredientRow(newIngredientRow);
                            }}
                        >
                            {t('new_recipe.add')}
                        </Button>
                    </Grid>
                </Grid>
                <IngredientsList ingredientsList={ingredientRow} onRemoveIngredient={removeIngredientList} />
                <Box style={{ width: '100%' }}>
                    <IconButton>
                        <LibraryAddIcon style={{ fontSize: 25, marginLeft: 'auto', marginRight: 'auto' }} />
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
};

export default NewRecipe;
