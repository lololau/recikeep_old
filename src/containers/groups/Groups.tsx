import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import SearchBar from '../../components/SearchBar';
import ListComponent from '../../components/List';
import { selectGroups, Group } from '../../slice/groupsSlice';
import { useSelector } from 'react-redux';

const Groups = (): JSX.Element => {
    const groups = useSelector(selectGroups);

    const { t } = useTranslation();

    const [groupsDisplay, setGroupsDisplay] = useState(groups);

    const onchange = (ids: string[]) => {
        const newGroups: Group[] = groups.filter((group) => {
            let resultat = false;
            for (let i = 0; i < ids.length; i++) {
                if (group.id.toString() === ids[i]) {
                    resultat = true;
                }
            }
            return resultat;
        });
        setGroupsDisplay(newGroups);
    };

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
                <SearchBar width="50%" onchange={onchange} elements={groups} />
            </Grid>
            <br />
            <ListComponent listElements={groupsDisplay} />
        </Container>
    );
};

export default Groups;
