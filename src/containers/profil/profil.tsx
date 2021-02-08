import '../../i18n';
import i18n from '../../i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import { RecipesList } from '../recipes/Recipes';

const myFavoriteRecipes = [{ name: 'Poulet cury', id: '0' }];

const Profile = (): JSX.Element => {
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    const { t } = useTranslation();
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <h1>{t('profile.title-page')}</h1>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Button onClick={() => changeLanguage('en')}>English</Button>
                    <Button onClick={() => changeLanguage('fr')}>Français</Button>
                </Grid>
            </Grid>
            <br />
            <Box style={{ alignItems: 'column' }}>
                <Avatar
                    style={{ width: 100, height: 100 }}
                    alt="my_picture"
                    src="https://www.vetostore.com/media/wysiwyg/img_fiche_conseil/Alimentation-lapin-sevrage-1.jpg"
                />
                <Button size="small">{t('profile.update-image')}</Button>
            </Box>
            <br />
            <br />
            <Grid container spacing={2} style={{ alignItems: 'center' }}>
                <p>{t('profile.username')}</p>
                <IconButton>
                    <EditIcon style={{ fontSize: 15 }} color="primary" />
                </IconButton>
            </Grid>
            <p>{t('profile.name')}</p>
            <br />
            <Grid container spacing={2} style={{ alignItems: 'center' }}>
                <p>{t('profile.favorite')}</p>
                <IconButton>
                    <EditIcon style={{ fontSize: 15 }} color="primary" />
                </IconButton>
            </Grid>
            <RecipesList recipes={myFavoriteRecipes} />
            <br />
            <Link to="/profile/my_ingredients">
                <p>{t('myIngredients.title-page')}</p>
            </Link>
        </Container>
    );
};

export default Profile;
