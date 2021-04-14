import React, { ChangeEvent, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, TextField, Box, Paper, Grid, Container } from '@material-ui/core';
import { fetchCreateUser, updateFirebaseUser, token, loading } from '../../slice/user/userSlice';
import { fetchGetIngredients } from '../../slice/ingredients/ingredientsSlice';
import { fetchGetUnities } from '../../slice/unity/unitySlice';
import { fetchGetAllRecipes } from '../../slice/recipes/recipesSlice';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { useTranslation } from 'react-i18next';

const SignUp = (): JSX.Element => {
    const [fullN, setFullName] = useState('');

    const dispatch = useDispatch();

    const idToken = useSelector(token);
    const isLoading = useSelector(loading);

    const { t } = useTranslation();

    const onChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
        setFullName(event.currentTarget.value);
    };

    if (isLoading) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                }}
            >
                <CircularProgress />
            </div>
        );
    }
    return (
        <>
            <Container style={{ maxWidth: '500px' }}>
                <Paper
                    style={{
                        top: '50%',
                        left: '50%',
                        marginTop: '50%',
                        marginBottom: '50%',
                        paddingTop: 15,
                    }}
                >
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <Box>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    onChange={onChangeFullName}
                                    placeholder={t('firebase.username')}
                                />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={5} style={{ marginTop: 20 }}>
                                <Grid item>
                                    <Button
                                        style={{ fontSize: '12px' }}
                                        onClick={async () => {
                                            await dispatch(fetchCreateUser({ fullName: fullN }));
                                            await dispatch(fetchGetIngredients(idToken));
                                            await dispatch(fetchGetUnities(idToken));
                                            await dispatch(fetchGetAllRecipes(idToken));
                                        }}
                                    >
                                        {t('firebase.create-user')}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{ fontSize: '12px' }}
                                        onClick={() => {
                                            firebase.auth().signOut();
                                            dispatch(updateFirebaseUser(''));
                                            document.location.reload();
                                        }}
                                    >
                                        {t('firebase.sign-out')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default SignUp;
