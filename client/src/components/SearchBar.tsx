// Dependencies
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Material-ui
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

const SearchBar = (props: SearchBarProps): JSX.Element => {
    const { elements } = props;
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const filterElements = (elements: Element[], value: string) => {
        const idList = elements
            .filter((item) => {
                // Check if element has an id
                if (!item.id) {
                    console.warn('error item got id undefined', item);
                    return false;
                }
                // Filter the list - checks if the search value belongs to each item in the list
                if (value) {
                    return item.name.toLowerCase().includes(value.toLowerCase());
                }
                // Return the filtered list
                return true;
            })
            .map((elt) => {
                return elt.id.toString();
            });

        props.onchange(idList);
    };

    // SearchBar handle change value
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setSearchTerm(newValue);
        filterElements(elements, newValue);
    };

    // Execute the effect if elements has been modified
    useEffect(() => {
        filterElements(elements, searchTerm);
    }, [elements]);

    return (
        <Box>
            <TextField
                value={searchTerm}
                label={t('searchBar.label')}
                variant="outlined"
                style={{ width: props.width }}
                onChange={handleChange}
            />
        </Box>
    );
};

export default SearchBar;
