import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import ListComponent from '../../components/List';
import { Unity } from '../../slice/unity/unityFetch';
import { unities } from '../../slice/unity/unitySlice';
import { useSelector } from 'react-redux';

const MyUnities = (): JSX.Element => {
    const unitiesList = useSelector(unities);
    const { t } = useTranslation();

    const [unitiesCustomDisplay, setUnitiesCustomDisplay] = useState(unitiesList);

    const selectUnitiesCustom = (unitiesElements: Unity[]): Unity[] =>
        unitiesElements.filter((unity) => {
            return unity.user_id !== null;
        });

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
            <SearchBar elements={unitiesList} onchange={onChange} width={'50%'} />
            <ListComponent listElements={selectUnitiesCustom(unitiesCustomDisplay)} />
        </Container>
    );
};

export default MyUnities;
