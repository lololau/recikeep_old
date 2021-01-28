import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TagsComboBox, TypeComboBox } from '../recipes/recipes';
import { PartsComboBox } from '../stepper/recipes_selection2';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';

const UnitsComboBox = (): JSX.Element => {
    const { t } = useTranslation();

    const units: string[] = ['ml', 'dl', 'cl', 'l', 'mg', 'g', 'kg', '', 'filets'];

    const [unit] = useState('');

    return (
        <div>
            <Autocomplete
                value={unit}
                id="controllable-states-demo"
                options={units}
                renderInput={(params) => (
                    <TextField {...params} placeholder={t('new_recipe.unitsBox-unit')} variant="outlined" />
                )}
            />
        </div>
    );
};

const QuantityComboBox = (): JSX.Element => {
    const { t } = useTranslation();

    const quantities: string[] = ['1', '2', '3', '4', '5', '100', '2000'];

    const [quantity] = useState('');

    return (
        <div>
            <Autocomplete
                value={quantity}
                id="controllable-states-demo"
                options={quantities}
                renderInput={(params) => (
                    <TextField {...params} placeholder={t('new_recipe.unitsBox-quantity')} variant="outlined" />
                )}
            />
        </div>
    );
};

const NewRecipe = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Container>
            <h1>{t('new_recipe.title-page')}</h1>
            <Box className="title">
                <p>{t('new_recipe.title')}</p>
                <TextField placeholder={t('new_recipe.add-title')} />
            </Box>
            <Box className="image">
                <p>{t('new_recipe.image')}</p>
                <Button variant="contained">{t('new_recipe.add-image')}</Button>
            </Box>
            <Box>
                <p>{t('new_recipe.presentation')}</p>
                <TextField fullWidth placeholder={t('new_recipe.add-presentation')} />
            </Box>
            <Box className="image">
                <p>{t('new_recipe.description')}</p>
                <Button variant="contained">{t('new_recipe.add-description')}</Button>
            </Box>
            <Box>
                <p>{t('new_recipe.tag')}</p>
                <TagsComboBox />
            </Box>
            <Box>
                <p>{t('new_recipe.type')}</p>
                <TypeComboBox />
            </Box>
            <Box>
                <p>{t('new_recipe.parts')}</p>
                <PartsComboBox />
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={4} className="preparation-time" style={{ display: 'block' }}>
                    <p>{t('new_recipe.preparation-time')}</p>
                    <Box style={{ display: 'flex' }}>
                        <TextField fullWidth placeholder={t('new_recipe.add-time')} margin="normal" />
                        <p>{t('new_recipe.minute')}</p>
                    </Box>
                </Grid>
                <Grid item xs={4} className="cooking-time" style={{ display: 'block' }}>
                    <p>{t('new_recipe.cooking-time')}</p>
                    <Box style={{ display: 'flex' }}>
                        <TextField fullWidth placeholder={t('new_recipe.add-time')} margin="normal" />
                        <p>{t('new_recipe.minute')}</p>
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <p>{t('new_recipe.ingredients')}</p>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <TextField placeholder={t('new_recipe.add-ingredient')} variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <UnitsComboBox />
                    </Grid>
                    <Grid item xs={3}>
                        <QuantityComboBox />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default NewRecipe;
