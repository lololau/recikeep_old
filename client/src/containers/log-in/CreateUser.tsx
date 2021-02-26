import React, { ChangeEvent, useState } from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import { token } from '../../slice/userSlice';
import { useSelector } from 'react-redux';

const SignUp = (): JSX.Element => {
    const [firstN, setFirstName] = useState('');
    const [lastN, setLastName] = useState('');

    const idToken = useSelector(token);

    const onChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.currentTarget.value);
    };

    const onChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.currentTarget.value);
    };

    const fetchCreateUser = () => {
        const myHeaders = new Headers({
            Authorization: idToken,
        });
        const bodyUser = { firstName: firstN, lastName: lastN };
        fetch('http://localhost:3000/api/user/createUser', {
            method: 'POST',
            body: JSON.stringify(bodyUser),
            headers: myHeaders,
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    };

    return (
        <>
            <Box style={{ alignItems: 'left' }}>
                <TextField type="text" onChange={onChangeFirstName} placeholder="Enter your first name" />
                <TextField type="text" onChange={onChangeLastName} placeholder="Enter your last name" />
            </Box>

            <Button onClick={fetchCreateUser}>Create User</Button>
        </>
    );
};

export default SignUp;
