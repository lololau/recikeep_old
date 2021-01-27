import { useTranslation } from 'react-i18next/';
import '../../i18n';
import React from 'react';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';

const MyRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Container>
            <Grid container style={{ alignItems: 'center' }}>
                <Grid>
                    <h1>{t('recipe.title')}</h1>
                </Grid>
                <Grid>
                    <EditIcon style={{ fontSize: 20 }} />
                </Grid>
            </Grid>
            <Grid className="image_and_time_table" style={{ width: '100%' }}>
                <Avatar
                    variant="rounded"
                    style={{ width: 250, height: 200, alignItems: 'center' }}
                    alt="pate_carbonara"
                    src="https://img.static-rmg.be/a/food/image/q75/w1280/h720/1086366/spaghetti-carbonara.jpg"
                />
                <Grid container spacing={4} className="time_and_parts_table">
                    <Grid item className="preparation_time">
                        <h3>Preparation</h3>
                        <p>20 min</p>
                    </Grid>
                    <Grid item className="cooking_time">
                        <h3>Cooking</h3>
                        <p>15 min</p>
                    </Grid>
                    <Grid item className="parts">
                        <Grid>
                            <p>2</p>
                        </Grid>
                        <Grid>
                            <PersonIcon />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid>
                <h3>Ingredients Component List</h3>
                <p>Ingredient 1</p>
                <p>blublu</p>
            </Grid>
            <Grid className="cooking_instructions">
                <h3>Cooking Instructions</h3>
                <img
                    alt="pates_carbonara_instructions"
                    src="../../../public/Capture d’écran 2021-01-14 à 16.37.29.png"
                />
            </Grid>
        </Container>
    );
};

export default MyRecipe;
