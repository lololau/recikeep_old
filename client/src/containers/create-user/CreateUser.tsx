// Dependencies
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/app';
// Slice
import { fetchCreateUser, updateFirebaseUser, loading } from '../../slice/user/userSlice';
import { fetchGetIngredients } from '../../slice/ingredients/ingredientsSlice';
import { fetchGetUnities } from '../../slice/unity/unitySlice';
import { fetchGetAllRecipes } from '../../slice/recipes/recipesSlice';
// Material-ui
import { Button, TextField, Box, Paper, Grid, Container, CircularProgress } from '@material-ui/core';

// SignUp component if firebase user is not created by setting a username
//
// Features :
// - Create user button : dispatch fetchCreateUser action with the username
// - Disconnect button : allow the user to return to the access account home page

const SignUp = (): JSX.Element => {
    const [fullN, setFullName] = useState('');

    const dispatch = useDispatch();

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
                                            await dispatch(fetchGetIngredients());
                                            await dispatch(fetchGetUnities());
                                            await dispatch(fetchGetAllRecipes());
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
