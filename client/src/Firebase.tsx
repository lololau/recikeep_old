import React, { ChangeEvent, useState } from 'react';
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Button, TextField, Grid } from '@material-ui/core';

const Firebase = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                // Signed in
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
            <Grid container spacing={6} style={{ alignItems: 'center' }}>
                <Grid item xs>
                    <TextField type="text" onChange={onChangeEmail} placeholder="Enter your email" />
                </Grid>
                <Grid item xs>
                    <TextField type="password" onChange={onChangePassword} placeholder="Enter your password" />
                </Grid>
                <Grid item xs>
                    <Button onClick={onSignIn}>Sign In</Button>
                </Grid>
            </Grid>
            <Button onClick={onSignUp}>Create an account</Button>
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
