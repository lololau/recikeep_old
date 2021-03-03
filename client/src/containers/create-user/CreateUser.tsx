import React, { ChangeEvent, useState } from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import { fetchCreateUser, updateFirebaseUser } from '../../slice/user/userSlice';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';

const SignUp = (): JSX.Element => {
    const [fullN, setFullName] = useState('');

    const dispatch = useDispatch();

    const onChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
        setFullName(event.currentTarget.value);
    };

    return (
        <>
            <Box style={{ alignItems: 'left' }}>
                <TextField type="text" onChange={onChangeFullName} placeholder="Enter your name" />
            </Box>

            <Button
                onClick={() =>
                    dispatch(
                        fetchCreateUser({
                            fullName: fullN,
                        }),
                    )
                }
            >
                Create User
            </Button>
            <Button
                onClick={() => {
                    firebase.auth().signOut();
                    dispatch(updateFirebaseUser(''));
                }}
            >
                Sign Out
            </Button>
        </>
    );
};

export default SignUp;
