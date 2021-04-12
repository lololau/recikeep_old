import React, { ChangeEvent, useState } from 'react';
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Button, TextField, Grid, Container, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Firebase = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { t } = useTranslation();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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

                if (errorMessage == 'The email address is badly formatted.') {
                    setErrorMessage(t('firebase.bad-email'));
                    handleClick();
                } else if (errorMessage == 'The password must be 6 characters long or more.') {
                    setErrorMessage(t('firebase.bad-password'));
                    handleClick();
                } else {
                    setErrorMessage(t('firebase.already-account'));
                    handleClick();
                }
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
                setErrorMessage(t('firebase.wrong-connection'));
                handleClick();
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
                                    <Snackbar
                                        open={open}
                                        style={{ marginBottom: 70 }}
                                        autoHideDuration={6000}
                                        onClose={handleClose}
                                    >
                                        <Alert onClose={handleClose} severity="error">
                                            {errorMessage}
                                        </Alert>
                                    </Snackbar>
                                </Grid>
                                <Grid item>
                                    <Button onClick={onSignUp} style={{ fontSize: '12px' }}>
                                        {t('firebase.create-account')}
                                    </Button>
                                    <Snackbar
                                        open={open}
                                        style={{ marginBottom: 70 }}
                                        autoHideDuration={6000}
                                        onClose={handleClose}
                                    >
                                        <Alert onClose={handleClose} severity="error">
                                            {errorMessage}
                                        </Alert>
                                    </Snackbar>
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
