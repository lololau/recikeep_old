import React, { ChangeEvent, useState } from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import { fetchCreateUser, updateFirebaseUser, token } from '../../slice/user/userSlice';
import { fetchGetIngredients } from '../../slice/ingredients/ingredientsSlice';
import { fetchGetUnities } from '../../slice/unity/unitySlice';
import { fetchGetAllRecipes } from '../../slice/recipes/recipesSlice';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';

const SignUp = (): JSX.Element => {
    const [fullN, setFullName] = useState('');

    const dispatch = useDispatch();

    const idToken = useSelector(token);

    const onChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
        setFullName(event.currentTarget.value);
    };

    return (
        <>
            <Box style={{ alignItems: 'left' }}>
                <TextField type="text" onChange={onChangeFullName} placeholder="Enter your name" />
            </Box>

            <Button
                onClick={async () => {
                    await dispatch(fetchCreateUser({ fullName: fullN }));
                    await dispatch(fetchGetIngredients(idToken));
                    await dispatch(fetchGetUnities(idToken));
                    await dispatch(fetchGetAllRecipes(idToken));
                }}
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
