import React, { ChangeEvent, useState } from 'react';
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Button, TextField, Grid, Container, Paper, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const Firebase = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { t } = useTranslation();

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onSignUp = () => {
        signUpWithEmailPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error: signUpWithEmailPassword, errorCode: ', errorCode);
                console.log('Error: signUpWithEmailPassword, errorMessage: ', errorMessage);
            });
    };

    const onSignIn = () => {
        signInWithEmailPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error: signInWithEmailPassword, errorCode: ', errorCode);
                console.log('Error: signInWithEmailPassword, errorMessage: ', errorMessage);
            });
    };

    return (
        <>
            <Container style={{ maxWidth: '500px' }}>
                <Paper
                    style={{
                        top: '50%',
                        left: '50%',
                        marginTop: '50%',
                        marginBottom: '50%',
                        paddingBottom: 5,
                    }}
                >
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <h2 style={{ marginBottom: 30 }}>{t('firebase.connect')}</h2>
                        </Grid>
                        <Grid item>
                            <TextField
                                style={{ width: '300px', marginBottom: 30 }}
                                label={t('firebase.email')}
                                variant="outlined"
                                type="text"
                                onChange={onChangeEmail}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                style={{ width: '300px' }}
                                label={t('firebase.password')}
                                variant="outlined"
                                type="password"
                                onChange={onChangePassword}
                            />
                        </Grid>
                        <Grid item>
                            <Grid container spacing={5} style={{ marginTop: 20 }}>
                                <Grid item>
                                    <Button onClick={onSignIn} style={{ fontSize: '12px' }}>
                                        {t('firebase.connection')}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={onSignUp} style={{ fontSize: '12px' }}>
                                        {t('firebase.create-account')}
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

export let firebaseId: string;

const signUpWithEmailPassword = (email: string, password: string) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
};

const signInWithEmailPassword = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};

export default Firebase;
