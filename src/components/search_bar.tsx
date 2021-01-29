import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Box } from '@material-ui/core';

type Element = {
    name: string;
    id: string;
};

type onChange = (elems: Element[]) => void;

type SearchBarProps = {
    onchange: onChange;
    elements: Element[];
};

const SearchBar = (props: SearchBarProps): JSX.Element => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
        props.elements.filter((item) => {
            if (searchTerm === '') {
                return item;
            }
            if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return item.name;
            }
        });
    };

    return (
        <Box>
            <TextField
                value={searchTerm}
                label={t('groups.searchBar')}
                variant="outlined"
                style={{ width: '50%' }}
                onChange={onChange}
            />
        </Box>
    );
};

export default SearchBar;
