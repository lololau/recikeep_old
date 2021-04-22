// Dependencies
import { useTranslation } from 'react-i18next/';
import '../../i18n';
import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Slice
import { selectRecipe, getRecipe } from '../../slice/recipe/recipeSlice';
import { IngredientsRecipe } from '../../slice/recipe/recipeFetch';
// Material-ui
import {
    Box,
    Paper,
    IconButton,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

type IngredientListProps = {
    ingredients: IngredientsRecipe[];
};

// IngredientsTable component
//
// Display all ingredients into a TableContainer with 3 rows :
// - Ingredient
// - Quantity
// - Unity
const IngredientsTable = (props: IngredientListProps) => {
    const { t } = useTranslation();
    return (
        <TableContainer component={Paper} style={{ maxWidth: 500 }}>
            <Table>
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

// MyRecipe component
//
// Component which contains all recipe informations :
// - name
// - short presentation of the recipe
// - time of preparation
// - time of cooking
// - number of parts
// - ingredients list display with <IngredientsTable /> component

const MyRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams<Params>();
    const recipe = useSelector(selectRecipe);

    useEffect(() => {
        dispatch(getRecipe(Number(id)));
    }, []);

    return (
        <Container>
            <Box>
                <Grid
                    container
                    style={{
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Grid item>
                        <h1>{recipe.name}</h1>
                    </Grid>
                    <Grid item>
                        <IconButton
                            style={{
                                float: 'right',
                                position: 'absolute',
                                marginRight: '12px',
                                right: '-2px',
                                top: '60px',
                            }}
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
            <Box style={{ width: '100%' }}>
                <p style={{ marginBottom: 60, marginTop: 0 }}>{recipe.presentation}</p>
                <Box
                    style={{
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        alignItems: 'center',
                        marginBottom: 60,
                    }}
                >
                    <Box style={{ marginBottom: 50 }}>
                        <p>
                            <b>
                                {t('recipe.for')} {recipe.number_parts} {t('recipe.peoples')}
                            </b>
                        </p>
                    </Box>
                    <Box>
                        <p>
                            {recipe.time_preparation &&
                                `${t('recipe.preparation-time')}: ${recipe.time_preparation} min`}
                        </p>
                    </Box>
                    <Box>
                        <p>{recipe.time_cooking && `${t('recipe.cooking-time')}: ${recipe.time_cooking} min`}</p>
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
