import React from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TagsBox from '../../components/Tags';
import { PartsComboBox } from '../stepper/RecipesSelection2';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
//mport { fetchSearchIngredients } from '../../slice/ingredients/ingredientsFetch';
import Autosuggestion from '../../components/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { token } from '../../slice/user/userSlice';
import { ingredients, fetchAddIngredient } from '../../slice/ingredients/ingredientsSlice';
import { unities } from '../../slice/unity/unitySlice';

interface IngredientType {
    inputValue?: string;
    name: string;
    id: number;
}

export const options: IngredientType[] = [
    { id: 0, name: 'fraise' },
    { id: 1, name: 'prout' },
    { id: 2, name: 'caca' },
    { id: 3, name: 'vagin' },
];
export const units: string[] = ['ml', 'dl', 'cl', 'l', 'mg', 'g', 'kg', 'unit', 'filets'];

const NewRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const idToken = useSelector(token);
    console.log(idToken);

    const ingredientsList = useSelector(ingredients);
    const unitiesList = useSelector(unities);

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
                            onSelect={(option) => console.log('selected', option)}
                            onAdd={(option) => dispatch(fetchAddIngredient(option))}
                            options={ingredientsList}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autosuggestion
                            label="add unit"
                            onSelect={(option) => console.log('selected', option)}
                            onAdd={(option) => console.log('added', option)}
                            options={unitiesList}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField placeholder="Quantity" variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <Button>{t('new_recipe.add')}</Button>
                    </Grid>
                </Grid>
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
