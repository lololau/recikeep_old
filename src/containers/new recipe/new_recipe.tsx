import React from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TagsComboBox, TypeComboBox } from '../recipes/recipes';
import { PartsComboBox } from '../recipes/recipes_selection2';
import Box from '@material-ui/core/Box';
import ToolsBar from '../toolsbar/toolsbar';
import Grid from '@material-ui/core/Grid';

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
            <ToolsBar />
        </Container>
    );
};

export default NewRecipe;
