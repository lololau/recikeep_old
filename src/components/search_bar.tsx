import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Box } from '@material-ui/core';

type Element = {
    name: string;
    id: string;
};

type onChange = (ids: string[]) => void;

type SearchBarProps = {
    width?: string;
    onchange: onChange;
    elements: Element[];
};

const SearchBar = (props: SearchBarProps): JSX.Element => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setSearchTerm(newValue);
        const idList = props.elements
            .filter((item) => {
                if (newValue === '') {
                    return true;
                }
                return item.name.toLowerCase().includes(newValue.toLowerCase());
            })
            .map((elt) => {
                return elt.id;
            });

        props.onchange(idList);
    };

    return (
        <Box>
            <TextField
                value={searchTerm}
                label={t('groups.searchBar')}
                variant="outlined"
                style={{ width: props.width }}
                onChange={handleChange}
            />
        </Box>
    );
};

export default SearchBar;
