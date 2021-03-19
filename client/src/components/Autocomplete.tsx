/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useTranslation } from 'react-i18next';

interface OptionType {
    inputValue?: string;
    name: string;
    id?: number;
}

type optionSelect = (option: OptionType) => void;

type AutosuggestionProps = {
    options: OptionType[];
    label?: string;
    onSelect?: optionSelect;
    onAdd?: optionSelect;
};

const filter = createFilterOptions<OptionType>();

const Autosuggestion = (Props: AutosuggestionProps): JSX.Element => {
    const { t } = useTranslation();

    const { onSelect, onAdd, options, label } = Props;
    const [value, setValue] = React.useState<OptionType | null>(null);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    console.warn('have a string here...', newValue);
                    setValue({
                        name: newValue,
                        id: -1,
                    });
                } else if (newValue == null) {
                    // empty field
                    setValue(newValue);
                } else if (newValue.inputValue) {
                    // new value was added
                    const newOption = {
                        name: newValue.inputValue,
                    };
                    if (onAdd) {
                        onAdd(newOption);
                    }
                    setValue(newOption);
                } else {
                    if (onSelect) {
                        onSelect(newValue);
                    }
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `${t('autocomplete.add')} "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(option) => option.name}
            style={{ maxWidth: 200 }}
            freeSolo
            renderInput={(params) => <TextField {...params} label={label ? label : ''} variant="outlined" />}
        />
    );
};

export default Autosuggestion;
