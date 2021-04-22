// Dependencies
import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import '../../i18n';
import i18n from '../../i18n';
// Slice
import { selectUser, updateUser } from '../../slice/user/userSlice';
// Material-ui
import { Button, Container, Box, Grid, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckIcon from '@material-ui/icons/Check';

// Profile component
// Component which contains all profil account informations like :
//
// - username (can be updated by clicking on the EditIcon)
// - email
// - ingredients registered by clicling on 'My Ingredients' (en) or 'Mes Ingredients' (fr)
// - unities registered by clicking on 'My Unities' or 'Mes Unités' (fr)

const Profile = (): JSX.Element => {
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    const { t } = useTranslation();

    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const [newName, setNewName] = useState(user.fullName);
    const [canUpdate, setCanUpdate] = useState(true);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.currentTarget.value);
    };

    const notUpdateName = () => {
        return (
            <IconButton
                onClick={() => {
                    setCanUpdate(false);
                }}
            >
                <EditIcon style={{ fontSize: 15 }} color="primary" />
            </IconButton>
        );
    };

    const updateName = () => {
        return (
            <>
                <IconButton
                    onClick={() => {
                        dispatch(updateUser({ fullName: newName }));
                        setCanUpdate(false);
                    }}
                >
                    <CheckIcon />
                </IconButton>
                <Button
                    onClick={() => {
                        setNewName(user.fullName);
                        setCanUpdate(true);
                    }}
                >
                    Cancel
                </Button>
            </>
        );
    };

    return (
        <>
            <Container>
                <Grid style={{ marginBottom: 30 }}>
                    <h1>{t('profile.title-page')}</h1>
                </Grid>
                <Grid container direction="column">
                    <Grid style={{ marginBottom: 10 }}>
                        <TextField type="text" onChange={onNameChange} value={newName} disabled={canUpdate} />
                        {!canUpdate && updateName()}
                        {canUpdate && notUpdateName()}
                    </Grid>
                    <Grid>
                        <p>{user.email}</p>
                    </Grid>
                </Grid>
                <Box style={{ display: 'grid', marginTop: 30 }}>
                    <Link
                        to="/profile/my_ingredients"
                        style={{ textDecoration: 'none', color: 'black', marginBottom: 20 }}
                    >
                        <Grid container style={{ alignItems: 'center' }}>
                            <Grid item>
                                <IconButton style={{ color: 'rgb(158, 189, 216)' }}>
                                    <ArrowRightIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <p>{t('myIngredients.title-page')}</p>
                            </Grid>
                        </Grid>
                    </Link>

                    <Link to="/profile/my_unities" style={{ textDecoration: 'none', color: 'black' }}>
                        <Grid container style={{ alignItems: 'center', width: '100%' }}>
                            <Grid item>
                                <IconButton style={{ color: 'rgb(158, 189, 216)' }}>
                                    <ArrowRightIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <p>{t('myUnities.title-page')}</p>
                            </Grid>
                        </Grid>
                    </Link>
                </Box>
                <Box style={{ marginTop: '60px', textAlign: 'center' }}>
                    <Button onClick={() => changeLanguage('en')}>English</Button>
                    <Button onClick={() => changeLanguage('fr')}>Français</Button>
                </Box>
            </Container>
        </>
    );
};

export default Profile;
