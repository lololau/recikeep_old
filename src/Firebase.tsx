import React, { ChangeEvent, useState } from 'react';
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import config from './config';
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

    console.log(email);
    console.log(password);
    return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
            <Grid container spacing={6} style={{ alignItems: 'center' }}>
                <Grid item xs>
                    <TextField type="text" onChange={onChangeEmail} placeholder="Enter your email" />
                </Grid>
                <Grid item xs>
                    <TextField type="password" onChange={onChangePassword} placeholder="Enter your password" />
                </Grid>
                <Grid item xs>
                    <Button
                        data-testid="signin-anon"
                        onClick={() => {
                            firebase
                                .auth()
                                .signInWithEmailAndPassword(email, password)
                                .then(function (result) {
                                    // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
                                    console.log(result);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    // Handle error.
                                });
                        }}
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid>
            <Button
                data-testid="signin-anon"
                onClick={() => {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .catch(function (error) {
                            // Handle Errors here.
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            if (errorCode == 'auth/weak-password') {
                                alert('The password is too weak.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                        });
                }}
            >
                Create an account
            </Button>
            <Button
                onClick={() => {
                    firebase.auth().signOut();
                }}
            >
                Sign Out
            </Button>
            <FirebaseAuthConsumer>
                {({ isSignedIn, user, providerId }) => {
                    if (user !== null) {
                        const firebaseId = user.uid;
                        console.log(firebaseId);
                        const email = user.email;
                        console.log(email);
                        const accessToken = user.za;
                        console.log(accessToken);
                    }
                    return (
                        <pre style={{ height: 300, overflow: 'auto' }}>
                            {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                        </pre>
                    );
                }}
            </FirebaseAuthConsumer>
            <IfFirebaseAuthedAnd filter={({ providerId }) => providerId !== 'anonymous'}>
                {({ providerId }) => {
                    return <div>You are authenticated with {providerId}</div>;
                }}
            </IfFirebaseAuthedAnd>
        </FirebaseAuthProvider>
    );
};

export default Firebase;
