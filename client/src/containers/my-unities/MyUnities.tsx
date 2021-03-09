import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import ListComponent, { Element } from '../../components/List';
import { Unity } from '../../slice/unity/unityFetch';
import { unities, fetchDeleteUnity } from '../../slice/unity/unitySlice';
import { useSelector, useDispatch } from 'react-redux';

const MyUnities = (): JSX.Element => {
    const unitiesList = useSelector(unities);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [unitiesCustomDisplay, setUnitiesCustomDisplay] = useState(unitiesList);

    const selectUnitiesCustom = (unitiesElements: Unity[]): Unity[] =>
        unitiesElements.filter((unity) => {
            return unity.user_id !== null;
        });

    const deleteUnity = (unity: Element) => {
        dispatch(fetchDeleteUnity(unity.id));
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
            <SearchBar elements={unitiesList} onchange={onChange} width={'50%'} />
            <ListComponent onRemoveElement={deleteUnity} listElements={selectUnitiesCustom(unitiesCustomDisplay)} />
        </Container>
    );
};

export default MyUnities;
