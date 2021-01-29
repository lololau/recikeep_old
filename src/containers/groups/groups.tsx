import React from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { IconButton, TextField } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';

type GroupsProps = {
    groups: group[];
};
type group = {
    name: string;
};
type groups = group[];

const myGroups: groups = [{ name: 'Famille Verhille' }, { name: 'Beeboo recipes' }, { name: 'Baguera Pot' }];

const GroupsList = (props: GroupsProps): JSX.Element => {
    return (
        <List>
            {props.groups.map((group, index) => {
                return (
                    <ListItem divider={true} key={index} style={{ height: 70 }}>
                        <ListItemText primary={group.name} id={index.toString()} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <DeleteIcon style={{ fontSize: 15 }} color="primary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

const Groups = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Container>
            <Grid container style={{ alignItems: 'center' }}>
                <Grid item xs={6}>
                    <h1>{t('groups.title-page')}</h1>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right', alignItems: 'center' }}>
                    <IconButton>
                        <AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid>
                <TextField label={t('groups.searchBar')} variant="outlined" style={{ width: '50%' }} />
            </Grid>
            <br />
            <GroupsList groups={myGroups} />
        </Container>
    );
};

export default Groups;
