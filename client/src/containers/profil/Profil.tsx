import '../../i18n';
import i18n from '../../i18n';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import { selectUser, fetchUpdateUser } from '../../slice/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';

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
                        dispatch(fetchUpdateUser({ fullName: newName }));
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
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <h1>{t('profile.title-page')}</h1>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Button onClick={() => changeLanguage('en')}>English</Button>
                    <Button onClick={() => changeLanguage('fr')}>Français</Button>
                </Grid>
            </Grid>
            <Box style={{ alignItems: 'column', marginBottom: 30 }}>
                <Avatar
                    style={{ width: 100, height: 100 }}
                    alt="my_picture"
                    src="https://www.vetostore.com/media/wysiwyg/img_fiche_conseil/Alimentation-lapin-sevrage-1.jpg"
                />
                <Button size="small">{t('profile.update-image')}</Button>
            </Box>
            <Grid container spacing={2} style={{ alignItems: 'center', marginBottom: 10 }}>
                <TextField type="text" onChange={onNameChange} value={newName} disabled={canUpdate} />
                {!canUpdate && updateName()}
                {canUpdate && notUpdateName()}
            </Grid>
            <Grid container spacing={2} style={{ alignItems: 'center', marginBottom: 30 }}>
                <p>{user.email}</p>
            </Grid>

            <Box style={{ display: 'grid' }}>
                <Link to="/profile/my_ingredients" style={{ textDecoration: 'none', color: 'black' }}>
                    <Button>{t('myIngredients.title-page')}</Button>
                </Link>

                <Link to="/profile/my_unities" style={{ textDecoration: 'none', color: 'black' }}>
                    <Button>{t('myUnities.title-page')}</Button>
                </Link>
            </Box>
        </Container>
    );
};

export default Profile;
