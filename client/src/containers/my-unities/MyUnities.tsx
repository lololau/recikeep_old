// Dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
// Slice
import { Unity } from '../../slice/unity/unityFetch';
import { unities, deleteUnity } from '../../slice/unity/unitySlice';
// Component
import SearchBar from '../../components/SearchBar';
import ListComponent, { Element } from '../../components/List';
// Material-ui
import { Container, Box } from '@material-ui/core';

// MyUnities component
//
// Component which contains all unities register on the profil account connected
const MyUnities = (): JSX.Element => {
    const unitiesList = useSelector(unities);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [unitiesCustomDisplay, setUnitiesCustomDisplay] = useState(unitiesList);

    // Method to select only unities register by the user account connected
    const selectUnitiesCustom = (unitiesElements: Unity[]): Unity[] =>
        unitiesElements.filter((unity) => {
            return unity.user_id !== null;
        });

    // Method to delete a specific unity by id
    const removeUnity = (unity: Element) => {
        dispatch(deleteUnity(unity.id));
    };

    const onChange = (ids: string[]) => {
        const newUnities: Unity[] = unitiesList.filter((unity) => {
            let resultat = false;
            for (let i = 0; i < ids.length; i++) {
                if (unity.id.toString() === ids[i]) {
                    resultat = true;
                }
            }
            return resultat;
        });
        setUnitiesCustomDisplay(newUnities);
    };

    return (
        <Container>
            <h1>{t('myUnities.title-page')}</h1>
            <Box style={{ marginTop: 30, marginBottom: 20 }}>
                <SearchBar elements={unitiesList} onchange={onChange} width="100%" />
            </Box>
            <ListComponent onRemoveElement={removeUnity} listElements={selectUnitiesCustom(unitiesCustomDisplay)} />
        </Container>
    );
};

export default MyUnities;
