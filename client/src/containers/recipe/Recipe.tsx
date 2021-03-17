import { useTranslation } from 'react-i18next/';
import '../../i18n';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import instructions_image from './description_recipe.png';
import { fetchGetARecipe, selectRecipe } from '../../slice/recipe/recipeSlice';
import { IngredientsRecipe } from '../../slice/recipe/recipeFetch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type IngredientListProps = {
    ingredients: IngredientsRecipe[];
};

const IngredientsTable: FC<IngredientListProps> = (props) => {
    const { t } = useTranslation();
    return (
        <TableContainer component={Paper} style={{ maxWidth: 300 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>{t('ingredients.ingredients')}</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {t('ingredients.quantity')}
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {t('ingredients.unity')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.ingredients.map((row) => (
                        <TableRow key={row.ingredient}>
                            <TableCell component="th" scope="row">
                                {row.ingredient}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.unity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

interface Params {
    id: string;
}

const MyRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { id } = useParams<Params>();
    const recipe = useSelector(selectRecipe);

    useEffect(() => {
        dispatch(fetchGetARecipe(Number(id)));
    }, []);

    return (
        <Container>
            <Grid
                spacing={4}
                container
                style={{
                    alignItems: 'center',
                    width: '100%',
                    position: 'fixed',
                    zIndex: 1,
                    top: 0,
                    backgroundColor: 'white',
                }}
            >
                <Grid item xs={6} className="title-page">
                    <h1>{recipe.name}</h1>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <IconButton>
                        <EditIcon style={{ fontSize: 20 }} color="primary" />
                    </IconButton>
                    <IconButton edge="end">
                        <DeleteIcon style={{ fontSize: 20 }} color="primary" />
                    </IconButton>
                </Grid>
            </Grid>
            <Box className="image_and_time_table" style={{ width: '100%', position: 'relative', marginTop: 60 }}>
                <Avatar
                    variant="rounded"
                    style={{
                        width: 400,
                        height: 300,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        justifyContent: 'start',
                    }}
                    alt="pate_carbonara"
                    src="https://img.static-rmg.be/a/food/image/q75/w1280/h720/1086366/spaghetti-carbonara.jpg"
                />
                <Grid
                    spacing={3}
                    container
                    className="time_and_parts_table"
                    style={{
                        textAlign: 'center',
                        marginRight: 'auto',
                        alignItems: 'center',
                        marginBottom: 60,
                    }}
                >
                    <Grid item xs={4} className="preparation_time">
                        <h4>{t('recipe.preparation-time')}</h4>
                        <p>{recipe.time_preparation} min</p>
                    </Grid>
                    <Grid item xs={4} className="cooking_time">
                        <h4>{t('recipe.cooking-time')}</h4>
                        <p>{recipe.time_cooking} min</p>
                    </Grid>
                    <Grid item xs={4} className="parts">
                        <Grid container spacing={3} style={{ alignItems: 'center' }}>
                            <Grid item xs>
                                <p>{recipe.number_parts}</p>
                            </Grid>
                            <Grid item xs>
                                <PersonIcon />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center' }}>
                <IngredientsTable ingredients={recipe.ingredients} />
            </Box>
            <Box className="cooking_instructions" style={{ textAlign: 'center', marginTop: 75 }}>
                <h3>{t('recipe.cooking-instructions')}</h3>
                <img
                    style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}
                    alt="pates_carbonara_instructions"
                    src={instructions_image}
                />
            </Box>
        </Container>
    );
};

export default MyRecipe;
