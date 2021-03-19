import { useTranslation } from 'react-i18next/';
import '../../i18n';
import { useHistory } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
        <TableContainer component={Paper} style={{ maxWidth: 500 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold', fontSize: 20 }}>
                            {t('ingredients.ingredients')}
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: 20 }}>
                            {t('ingredients.quantity')}
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: 20 }}>
                            {t('ingredients.unity')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.ingredients.map((row) => (
                        <TableRow key={row.ingredient}>
                            <TableCell component="th" scope="row" style={{ fontSize: 15 }}>
                                {row.ingredient}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 15 }}>
                                {row.quantity}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 15 }}>
                                {row.unity}
                            </TableCell>
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
    const history = useHistory();

    const { id } = useParams<Params>();
    const recipe = useSelector(selectRecipe);

    useEffect(() => {
        dispatch(fetchGetARecipe(Number(id)));
    }, []);

    return (
        <Container>
            <Box>
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
                        <IconButton
                            onClick={() => {
                                history.push(`/recipes/update/${id}`);
                                console.log(recipe);
                            }}
                        >
                            <EditIcon style={{ fontSize: 20 }} color="primary" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Box className="image_and_time_table" style={{ width: '100%', position: 'relative', marginTop: 60 }}>
                <h3 style={{ marginBottom: 50 }}>{recipe.presentation}</h3>
                <Box
                    className="time_and_parts_table"
                    style={{
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        alignItems: 'center',
                        marginBottom: 60,
                    }}
                >
                    <Box style={{ marginBottom: 50 }}>
                        <h3>
                            {t('recipe.for')} {recipe.number_parts} {t('recipe.peoples')}
                        </h3>
                    </Box>
                    <Box>
                        <h4>
                            {recipe.time_preparation &&
                                `${t('recipe.preparation-time')}: ${recipe.time_preparation} min`}
                        </h4>
                    </Box>
                    <Box>
                        <h4>{recipe.time_cooking && `${t('recipe.cooking-time')}: ${recipe.time_cooking} min`}</h4>
                    </Box>
                </Box>
            </Box>
            <Box style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center' }}>
                <IngredientsTable ingredients={recipe.ingredients} />
            </Box>
        </Container>
    );
};

export default MyRecipe;
