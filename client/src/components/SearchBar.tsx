import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Box } from '@material-ui/core';

interface Element {
    name: string;
    id: number;
}

type onChange = (ids: string[]) => void;

type SearchBarProps = {
    width?: string;
    onchange: onChange;
    elements: Element[];
};

export const filterSearchBar = (groups: Element[], filter: string[]): Element[] => {
    return groups.filter((group) => {
        return filter.includes(group.id.toString());
    });
};

const SearchBar = (props: SearchBarProps): JSX.Element => {
    const { elements } = props;
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const filterElements = (elements: Element[], value: string) => {
        console.log(elements);
        const idList = elements
            .filter((item) => {
                if (value) {
                    return item.name.toLowerCase().includes(value.toLowerCase());
                }
                return true;
            })
            .map((elt) => {
                return elt.id.toString();
            });

        props.onchange(idList);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setSearchTerm(newValue);
        filterElements(elements, newValue);
    };

    useEffect(() => {
        filterElements(elements, searchTerm);
    }, [elements]);

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
