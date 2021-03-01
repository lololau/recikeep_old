import React, { ChangeEvent, useState } from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import { fetchCreateUser, updateFirebaseId } from '../../slice/user/userSlice';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';

const SignUp = (): JSX.Element => {
    const [firstN, setFirstName] = useState('');
    const [lastN, setLastName] = useState('');

    const dispatch = useDispatch();

    const onChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.currentTarget.value);
    };

    const onChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.currentTarget.value);
    };

    return (
        <>
            <Box style={{ alignItems: 'left' }}>
                <TextField type="text" onChange={onChangeFirstName} placeholder="Enter your first name" />
                <TextField type="text" onChange={onChangeLastName} placeholder="Enter your last name" />
            </Box>

            <Button
                onClick={() =>
                    dispatch(
                        fetchCreateUser({
                            firstName: firstN,
                            lastName: lastN,
                        }),
                    )
                }
            >
                Create User
            </Button>
            <Button
                onClick={() => {
                    firebase.auth().signOut();
                    dispatch(updateFirebaseId(''));
                }}
            >
                Sign Out
            </Button>
        </>
    );
};

export default SignUp;
