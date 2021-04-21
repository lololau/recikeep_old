// Dependencies
import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Store - Slice
import { updateNotification, selectNotification } from '../../slice/notification/notificationSlice';
import { useAppDispatch } from '../../app/store';
// Component
import Notification from '../../components/Notification';
// Material-ui
import { Button, TextField, Grid, Container, Paper } from '@material-ui/core';

// signUpWithEmailPassword function made with createUserWithEmailAndPassword(email, password) method from firebase
const signUpWithEmailPassword = (email: string, password: string) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
};

// signInWithEmailPassword function made with signInWithEmailAndPassword(email, password) method from firebase
const signInWithEmailPassword = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};
// Home Access component : Take an email and a password to have an account
//
// Features:
// - Textfield for enter : email + password
// - SignIn button (if user already created)
// - SignUp button (if user not created)
// - Errors display if user make a mistake by entering wrong data or by clicking on wrong button with <Notification />

const HomeAccess = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const notification = useSelector(selectNotification);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { t } = useTranslation();

    // HandleChange event - email
    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    // HandleChange event - password
    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    // SignUp method
    const onSignUp = () => {
        signUpWithEmailPassword(email, password).catch((error) => {
            const errorCode = error.code;

            if (errorCode == 'auth/invalid-email') {
                dispatch(updateNotification({ message: t('firebase.bad-email'), severity: 'error' }));
            } else if (errorCode == 'auth/weak-password') {
                dispatch(updateNotification({ message: t('firebase.bad-password'), severity: 'error' }));
            } else if (errorCode == 'auth/email-already-in-use') {
                dispatch(updateNotification({ message: t('firebase.already-account'), severity: 'error' }));
            }
        });
    };

    // SignIn method
    const onSignIn = () => {
        signInWithEmailPassword(email, password).catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/invalid-email') {
                dispatch(updateNotification({ message: t('firebase.bad-email'), severity: 'error' }));
            }
            if (errorCode == 'auth/wrong-password') {
                dispatch(updateNotification({ message: t('firebase.wrong-connection'), severity: 'error' }));
            }
        });
    };

    return (
        <>
            <Container style={{ maxWidth: '500px' }}>
                <Notification message={notification.message} severity={notification.severity} id={notification.id} />
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

export default HomeAccess;
