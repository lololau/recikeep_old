import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchBar, { filterSearchBar } from '../../components/search_bar';

type GroupsProps = {
    groups: group[];
};
type group = {
    name: string;
    id: string;
};
type groups = group[];

const myGroups: groups = [
    { name: 'Famille Verhille', id: '0' },
    { name: 'Beeboo recipes', id: '1' },
    { name: 'Baguera Pot', id: '2' },
];

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

    const [groupsDisplay, setGroupsDisplay] = useState(myGroups);

    const onchange = (ids: string[]) => {
        const groups = filterSearchBar(myGroups, ids);
        setGroupsDisplay(groups);
        console.log(groups);
    };

    //const filteredGroups = filter(myGroups, TestSearchBar);

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
                <SearchBar width="50%" onchange={onchange} elements={myGroups} />
            </Grid>
            <br />
            <GroupsList groups={groupsDisplay} />
        </Container>
    );
};

export default Groups;
